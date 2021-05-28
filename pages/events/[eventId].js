import { getEventById, getFeaturedEvents } from '../../helpers/api-utilities';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function EventDetailPage(props) {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <>
        <div className='center'>
          <p>Loading...</p>
        </div>
        <div className='center'>
          <Button link={'/events'}>Back to all events page</Button>
        </div>
      </>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.imageAlt}
      />
      <EventContent>{event.description}</EventContent>
    </>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const allEvents = await getFeaturedEvents();
  const paths = allEvents.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths,
    fallback: 'blocking',
  };
}
export default EventDetailPage;
