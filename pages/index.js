import Head from 'next/head';

import { getFeaturedEvents } from '../helpers/api-utilities';
import EventList from '../components/events/event-list';
import NewsletterRegistration from '../components/input/newsletter-registration';

function HomePage(props) {
  const { events } = props;
  return (
    <div>
      <Head>
        <title>Events app</title>
        <meta
          name="description"
          content="This application was created in the next course."
        />
      </Head>
      <NewsletterRegistration />
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
    revalidate: 1800,
  };
}

export default HomePage;
