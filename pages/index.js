import { getFeaturedEvents } from '../helpers/api-utilities';
import EventList from '../components/events/event-list';

function HomePage(props) {
  const { events } = props;
  return (
    <div>
      <EventList items={events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
  };
}

export default HomePage;
