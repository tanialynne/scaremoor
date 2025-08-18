import { NextResponse } from "next/server";

const baseURL = "https://api.kit.com/v4";

export const POST = async (request: Request) => {
  try {
    const { form_id, subscriber_data } = await request.json();

    const createResponse = await fetch(`${baseURL}/subscribers`, {
      method: "POST",
      headers: {
        "X-Kit-Api-Key": process.env.KIT_API_KEY as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscriber_data),
    });

    const createData = await createResponse.json();

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
