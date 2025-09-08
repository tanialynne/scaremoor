import { NextRequest, NextResponse } from "next/server";
import { newsletterRateLimit } from "../../lib/rateLimit";
import { validateEmail } from "../../lib/validation";

const baseURL = "https://api.kit.com/v4";

export const POST = async (request: NextRequest) => {
  try {
    // Rate limiting check
    const rateLimitResult = newsletterRateLimit(request);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: rateLimitResult.error },
        { status: 429 }
      );
    }

    const { form_id, subscriber_data } = await request.json();

    // Validate email if provided in subscriber_data
    if (subscriber_data?.email_address) {
      const emailValidation = validateEmail(subscriber_data.email_address);
      if (!emailValidation.isValid) {
        return NextResponse.json(
          { error: emailValidation.errors.join(', ') },
          { status: 400 }
        );
      }
    }

    // Log the request for debugging
    console.log("Kit API Request:", {
      form_id,
      subscriber_data,
      hasApiKey: !!process.env.KIT_API_KEY,
    });

    const createResponse = await fetch(`${baseURL}/subscribers`, {
      method: "POST",
      headers: {
        "X-Kit-Api-Key": process.env.KIT_API_KEY as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscriber_data),
    });

    const createData = await createResponse.json();
    
    // Log the response for debugging
    console.log("Kit API Create Response:", {
      status: createResponse.status,
      ok: createResponse.ok,
      data: createData,
    });

    // Check if subscriber creation was successful
    if (!createResponse.ok) {
      console.error("Kit subscriber creation failed:", createData);
      return NextResponse.json(
        { 
          error: createData.error || createData.message || "Failed to create subscriber",
          details: createData 
        },
        { status: createResponse.status }
      );
    }

    // 2. If subscriber created successfully, add to form
    if (form_id) {
      const addToFormResponse = await fetch(`${baseURL}/forms/${form_id}/subscribers`, {
        method: "POST",
        headers: {
          "X-Kit-Api-Key": process.env.KIT_API_KEY as string,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: subscriber_data.email_address,

          referrer: subscriber_data.referrer || "",
        }),
      });

      const addToFormData = await addToFormResponse.json();
      
      console.log("Kit API Form Add Response:", {
        status: addToFormResponse.status,
        ok: addToFormResponse.ok,
        data: addToFormData,
      });

      if (!addToFormResponse.ok) {
        return NextResponse.json(
          {
            subscriber_created: true,
            subscriber_data: createData,
            form_error: addToFormData,
          },
          { status: addToFormResponse.status }
        );
      }

      return NextResponse.json(
        {
          subscriber: createData,
          form_subscription: addToFormData,
        },
        { status: 201 }
      );
    }

    return NextResponse.json(createData, { status: 201 });
  } catch (error) {
    console.error("Subscriber processing failed:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
};
