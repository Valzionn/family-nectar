import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { getCalendarEvents, createCalendarEvent, deleteCalendarEvent } from '../services/api';

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string; 
}

const CalendarPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [newEvent, setNewEvent] = useState("");
  const [newEventTime, setNewEventTime] = useState(""); 
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await getCalendarEvents();
      setEvents(response.data.map((event) => ({
        ...event,
        date: new Date(event.date),
        time: event.time 
      })));
    };
    fetchEvents();
  }, []);

  const addEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newEvent.trim() && selectedDate && newEventTime.trim()) {
      const newEventData = {
        title: newEvent.trim(),
        date: selectedDate.toISOString(),
        time: newEventTime 
      };
      try {
        const response = await createCalendarEvent(newEventData);
        setEvents([
          ...events,
          { ...response.data, date: new Date(response.data.date) },
        ]);
        setNewEvent("");
        setNewEventTime(""); 
        setDialogOpen(false);
        toast.success("Event added successfully!");
      } catch (error) {
        toast.error("Failed to add event");
      }
    }
  };

  const getDayEvents = (date: Date) => {
    return events.filter(
      (event) => event.date.toDateString() === date.toDateString()
    );
  };

  return (
    <div className="container px-4 py-8 max-w-3xl mx-auto">
      <Link to="/index">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>
      </Link>

      <h1 className="text-3xl font-bold mb-6">Family Calendar</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            modifiers={{
              event: (date) => getDayEvents(date).length > 0,
            }}
            modifiersStyles={{
              event: { backgroundColor: "var(--primary)", fontWeight: "bold", color: "white" },
            }}
          />
        </div>

        <div className="flex-1">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full mb-4">
                <Plus className="mr-2 h-4 w-4" /> Add Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
              </DialogHeader>
              <form onSubmit={addEvent} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border mx-auto"
                  />
                  <Input
                    type="text"
                    value={newEvent}
                    onChange={(e) => setNewEvent(e.target.value)}
                    placeholder="Event title..."
                  />
                  <Input
                    type="time"
                    value={newEventTime}
                    onChange={(e) => setNewEventTime(e.target.value)}
                    placeholder="Event time..."
                  />
                  <Button type="submit" className="w-full">
                    Add Event
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {selectedDate && (
            <div className="rounded-md border p-4">
              <h2 className="font-semibold mb-4">
                Events for {selectedDate.toDateString()}
              </h2>
              {getDayEvents(selectedDate).length === 0 ? (
                <p className="text-muted-foreground">No events scheduled</p>
              ) : (
                <ul className="space-y-2">
                  {getDayEvents(selectedDate).map((event) => (
                    <li
                      key={event.id}
                      className="p-2 rounded bg-secondary/20"
                    >
                      {event.title} at {event.time}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;