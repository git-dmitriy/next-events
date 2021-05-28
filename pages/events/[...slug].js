import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import ErrorAlert from '../../components/ui/error-alert';
import Button from '../../components/ui/button';
import useSWR from 'swr';

function FilteredEventsPage(props) {
  const [loadedEvents, setloadedEvents] = useState();
  const { data, error } = useSWR(
    'https://next-events-5820c-default-rtdb.asia-southeast1.firebasedatabase.app/events.json'
  );
  const router = useRouter();
  const filteredDate = router.query.slug;

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setloadedEvents(events);
    }
  }, [data]);

  let pageHeadContent = (
    <Head>
      <title>Filtered event</title>
      <meta name='description' content={'A list of filtered events.'} />
    </Head>
  );

  if (!loadedEvents) {
    return (
      <>
        {pageHeadContent}
        <p className='center'>Loading...</p>
      </>
    );
  }

  const filteredYear = filteredDate[0];
  const filteredMonth = filteredDate[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  pageHeadContent = (
    <Head>
      <title>Filtered event</title>
      <meta
        name='description'
        content={`All events for ${numMonth}/${numYear} date.`}
      />
    </Head>
  );

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear < 2021 ||
    numYear > 2030 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <>
        {pageHeadContent}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link={'/events'}>Back to events page</Button>
        </div>
      </>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  const date = new Date(numYear, numMonth - 1);

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadContent}
        <ErrorAlert>
          <p>No events found for this filter.</p>
        </ErrorAlert>
        <div className='center'>
          <Button link={'/events'}>Back to events page</Button>
        </div>
      </>
    );
  }
  return (
    <>
      {pageHeadContent}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
}

export default FilteredEventsPage;
