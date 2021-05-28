import { useRouter } from 'next/router';
import Head from 'next/head';
import { getAllEvents } from '../../helpers/api-utilities';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';

function AllEventsPage(props) {
  const router = useRouter();
  const { events } = props;

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <>
      <Head>
        <title>All Events</title>
        <meta
          name='description'
          content='This application was created in the next course.'
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events,
    },
    revalidate: 60,
  };
}

export default AllEventsPage;
