import { NextRequest, NextResponse } from "next/server";
import { newsletterRateLimit } from "../../lib/rateLimit";
import { validateLeadMagnetForm, isHoneypotFilled } from "../../lib/validation";

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

    // Silent rejection for honeypot (return success but don't process)
    if (isHoneypotFilled(subscriber_data?.honeypot)) {
      console.log("Bot detected via honeypot:", subscriber_data?.email_address);
      // Return fake success to not alert the bot
      return NextResponse.json(
        { subscriber: { id: "blocked" }, message: "Success" },
        { status: 201 }
      );
    }

    // Comprehensive form validation (email, name, timing)
    const formValidation = validateLeadMagnetForm({
      first_name: subscriber_data?.first_name || '',
      email_address: subscriber_data?.email_address || '',
      honeypot: subscriber_data?.honeypot,
      formLoadedAt: subscriber_data?.formLoadedAt,
      referrer: subscriber_data?.referrer,
    });

    if (!formValidation.isValid) {
      console.log("Form validation failed:", formValidation.errors, "Data:", {
        name: subscriber_data?.first_name,
        email: subscriber_data?.email_address,
      });
      return NextResponse.json(
        { error: formValidation.errors.join(', ') },
        { status: 400 }
      );
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
