import EventForm from "@/components/shared/EventForm";
import { getEventById } from "@/lib/actions/event.actions";
import { auth } from "@clerk/nextjs";

const UpdateEvent = async ({ params: { id } }: { params: { id: string } }) => {
  const { sessionClaims } = auth();
  const { userId } = sessionClaims?.userId as any;

  const event = await getEventById(id);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h1 className="wrapper h3-bold text-center sm:text-left">
          Update Event
        </h1>
      </section>

      <div className="wrapper my-8">
        <EventForm
          userId={userId}
          type={"Update"}
          event={event}
          eventId={event._id}
        />
      </div>
    </>
  );
};

export default UpdateEvent;
