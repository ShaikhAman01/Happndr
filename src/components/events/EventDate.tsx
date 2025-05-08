// components/events/EventDate.tsx
interface EventDateProps {
    dateString: string | Date;
  }
  
  const EventDate: React.FC<EventDateProps> = ({ dateString }) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
  
    return (
      <span>
        {date.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </span>
    );
  };
  
  export default EventDate;