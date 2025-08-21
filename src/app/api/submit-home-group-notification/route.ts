import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/lib/sanity/sanity.utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, email, areaInJacksonville } = body;
    
    if (!name || !email || !areaInJacksonville) {
      return NextResponse.json(
        { error: 'Name, email, and area in Jacksonville are required.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Check if user has already submitted a notification request with the same email
    const existingRequest = await client.fetch(
      `*[_type == "homeGroupNotification" && email == $email][0]`,
      { email }
    );

    if (existingRequest) {
      return NextResponse.json(
        { error: 'A notification request with this email already exists.' },
        { status: 409 }
      );
    }

    // Create the notification document
    const notificationData = {
      _type: 'homeGroupNotification',
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: body.phone?.trim() || null,
      areaInJacksonville: areaInJacksonville.trim(),
      additionalNotes: body.additionalNotes?.trim() || null,
      submittedAt: new Date().toISOString(),
      status: 'new',
    };

    // Save to Sanity
    const result = await client.create(notificationData);

    console.log('Home group notification saved:', result._id);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you! We\'ll notify you when home groups are available.',
        id: result._id 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error saving home group notification:', error);
    
    return NextResponse.json(
      { error: 'Failed to save notification request. Please try again.' },
      { status: 500 }
    );
  }
}
