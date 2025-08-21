import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/lib/sanity/sanity.utils';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const { eventId } = await params;

    if (!eventId) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      );
    }

    // Get current event data
    const event = await client.fetch(
      `*[_type == "event" && _id == $eventId][0] { _id, likes }`,
      { eventId }
    );

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Increment likes count
    const currentLikes = event.likes || 0;
    const newLikes = currentLikes + 1;

    // Update the event in Sanity
    await client
      .patch(eventId)
      .set({ likes: newLikes })
      .commit();

    return NextResponse.json(
      { 
        success: true, 
        likes: newLikes,
        message: 'Event liked successfully'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error liking event:', error);
    return NextResponse.json(
      { error: 'Failed to like event. Please try again.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const { eventId } = await params;

    if (!eventId) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      );
    }

    // Get current event data
    const event = await client.fetch(
      `*[_type == "event" && _id == $eventId][0] { _id, likes }`,
      { eventId }
    );

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Decrement likes count (but don't go below 0)
    const currentLikes = event.likes || 0;
    const newLikes = Math.max(0, currentLikes - 1);

    // Update the event in Sanity
    await client
      .patch(eventId)
      .set({ likes: newLikes })
      .commit();

    return NextResponse.json(
      { 
        success: true, 
        likes: newLikes,
        message: 'Event unliked successfully'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error unliking event:', error);
    return NextResponse.json(
      { error: 'Failed to unlike event. Please try again.' },
      { status: 500 }
    );
  }
}
