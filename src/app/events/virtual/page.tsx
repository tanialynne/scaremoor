import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Herobox from "../../components/Herobox";
import Button from "../../components/Button";
import InfoCard from "../../components/InfoCard";
import SAMPLE_EVENTS, { 
  getVirtualEvents,
  formatEventDate, 
  formatEventLocation,
  Event,
  EventType 
} from "../../constants/Events";

import BackgroundImage from "../../../../public/images/singleBookBackground.png";
import OrangeBackgroundMd from "../../../../public/images/orangeBackgroundMd.png";
import YellowBackground from "../../../../public/images/yellowBackground.png";
import CloudRight from "../../../../public/images/cloudRightTop.png";
import CloudBottom from "../../../../public/images/cloudBottomLeft.png";

export const metadata: Metadata = {
  title: "Virtual Events",
  description: "Join T.L. Griffith online for virtual readings, trivia nights, and interactive events. Experience Scaremoor from anywhere in the world.",
  openGraph: {
    title: "Scaremoor Virtual Events | Online with the Author",
    description: "Join T.L. Griffith online for virtual readings, trivia nights, and interactive events.",
  },
};

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const getEventTypeIcon = (eventType: EventType): string => {
    switch (eventType) {
      case 'book-signing': return '✍️';
      case 'book-launch': return '🚀';
      case 'virtual-event': return '💻';
      case 'reading': return '📖';
      case 'interview': return '🎙️';
      case 'workshop': return '✨';
      case 'other': return '🎊';
      default: return '📅';
    }
  };

  const getEventTypeLabel = (eventType: EventType): string => {
    switch (eventType) {
      case 'book-signing': return 'Book Signing';
      case 'book-launch': return 'Book Launch';
      case 'virtual-event': return 'Virtual Event';
      case 'reading': return 'Reading';
      case 'interview': return 'Interview';
      case 'workshop': return 'Workshop';
      case 'other': return 'Special Event';
      default: return 'Event';
    }
  };

  const getLocationIcon = () => {
    switch (event.location.type) {
      case 'virtual': return '🌐';
      case 'hybrid': return '🔄';
      case 'in-person':
      default: return '📍';
    }
  };

  const isUpcoming = new Date(event.startDate) > new Date();
  const isPaid = event.ticketPrice && event.ticketPrice > 0;
  const isFree = event.ticketPrice === 0;

  return (
    <div className={`bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-orange-700/30 rounded-lg p-6 hover:border-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 backdrop-blur-sm ${
      event.featured ? 'ring-2 ring-orange-400/50' : ''
    }`}>
      {/* Event type and status */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{getEventTypeIcon(event.eventType)}</span>
          <span className="text-xs text-orange-400 bg-orange-900/30 px-2 py-1 rounded">
            {getEventTypeLabel(event.eventType)}
          </span>
          {event.featured && (
            <span className="text-xs text-yellow-400 bg-yellow-900/30 px-2 py-1 rounded">
              Featured
            </span>
          )}
        </div>
        {isPaid ? (
          <span className="text-xs text-green-400 bg-green-900/30 px-2 py-1 rounded">
            ${event.ticketPrice}
          </span>
        ) : isFree ? (
          <span className="text-xs text-green-400 bg-green-900/30 px-2 py-1 rounded font-semibold">
            FREE
          </span>
        ) : null}
      </div>

      {/* Event title */}
      <h3 className="text-xl font-semibold text-white mb-2 font-trickordead">
        {event.title}
      </h3>

      {/* Date and time */}
      <div className="flex items-center text-gray-300 mb-2">
        <span className="mr-2">📅</span>
        <span className="text-sm">{formatEventDate(event)}</span>
      </div>

      {/* Location */}
      <div className="flex items-center text-gray-300 mb-3">
        <span className="mr-2">{getLocationIcon()}</span>
        <span className="text-sm">{formatEventLocation(event)}</span>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-4 line-clamp-3">
        {event.description}
      </p>

      {/* Attendee info */}
      {event.maxAttendees && (
        <div className="flex items-center text-gray-400 text-xs mb-4">
          <span className="mr-2">👥</span>
          <span>
            {event.currentAttendees || 0} / {event.maxAttendees} attendees
            {event.targetAudience && ` • ${event.targetAudience}`}
          </span>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-2">
        {isUpcoming && event.requiresRegistration && event.registrationUrl && (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900 hover:scale-105 text-sm"
          >
            {isPaid ? 'Buy Tickets' : 'Register Free'}
          </a>
        )}
        
        {isUpcoming && event.ticketUrl && event.ticketUrl !== event.registrationUrl && (
          <a
            href={event.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 hover:scale-105 text-sm"
          >
            Get Tickets
          </a>
        )}

        {event.location.type === 'virtual' && event.location.virtualUrl && isUpcoming && (
          <a
            href={event.location.virtualUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 hover:scale-105 text-sm"
          >
            Join Virtual Event
          </a>
        )}
      </div>
    </div>
  );
};

const VirtualEventsPage = () => {
  const virtualEvents = getVirtualEvents().filter(event => event.status === 'upcoming');

  return (
    <>
      <Herobox backgroundImage={BackgroundImage} contentPaddingTop="lg:pt-22">
        <div className="items-center">
          <div className="space-y-5 lg:pt-10">
            <div className="font-trickordead font-normal space-y-4 [text-shadow:0_0_10px_rgba(0,0,0,0.8)]">
              <h2 className="hero-text-large">Join from Anywhere.</h2>
              <h1 className="hero-text-xlarge max-w-[20ch]">
                Virtual Events & Online Fun.
              </h1>
            </div>

            <p
              className="max-w-[80ch] font-light"
              style={{
                textShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
              }}
            >
              Experience the spine-tingling world of Scaremoor from the comfort of your home. 
              Join T.L. Griffith for virtual readings, interactive trivia nights, Q&A sessions, 
              and special online events that bring fans together from around the world.
            </p>

            <div className="flex flex-col sm:flex-row pt-8 gap-5">
              <Link href="#virtual-events">
                <Button
                  buttonImage={OrangeBackgroundMd}
                  altText="view-virtual-events"
                  text="View Virtual Events"
                />
              </Link>

              <Link href="/contact">
                <Button
                  buttonImage={YellowBackground}
                  altText="suggest-event"
                  text="Suggest an Event"
                  textColor="text-black"
                />
              </Link>
            </div>
          </div>
        </div>
      </Herobox>

      <main className="text-white">
        {/* Virtual Events Section */}
        <section
          id="virtual-events"
          className="px-8 md:px-20 py-20 min-h-180 h-full relative overflow-hidden space-y-6"
        >
          <div className="text-center space-y-6 relative z-50">
            <h2 className="font-trickordead font-normal text-4xl sm:text-6xl capitalize gradient-text-accessible">
              Upcoming Virtual Events
            </h2>
            <p className="max-w-[60ch] mx-auto">
              Connect with the Scaremoor community online! Perfect for fans who can't attend 
              in-person events or want to join from anywhere in the world.
            </p>
          </div>

          <div className="pt-12 relative z-50">
            {virtualEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {virtualEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">💻</div>
                <h3 className="text-2xl text-gray-300 mb-2">No Upcoming Virtual Events</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  Check back soon for new virtual events, or follow us on social media 
                  to get notified when we announce online activities!
                </p>
                <Link href="/contact" className="inline-block mt-6">
                  <Button
                    buttonImage={OrangeBackgroundMd}
                    altText="suggest-event"
                    text="Suggest an Event"
                  />
                </Link>
              </div>
            )}
          </div>

          <Image
            src={CloudRight}
            alt="cloud"
            className="absolute top-10 right-0 -z-10"
          />
          <Image
            src={CloudBottom}
            alt="cloud"
            className="absolute bottom-0 left-0 -z-10"
          />
        </section>

        {/* Types of Virtual Events Section */}
        <section className="px-8 md:px-20 py-20 space-y-8">
          <div className="text-center space-y-6">
            <h2 className="font-trickordead font-normal text-4xl sm:text-6xl capitalize gradient-text-accessible pb-12">
              Types of Virtual Events We Host
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-8 lg:px-12">
            <InfoCard
              cardIconFa="fa-solid fa-book-open"
              cardTitle="Virtual Readings"
              cardDescription="Listen as T.L. Griffith reads excerpts from Scaremoor books with dramatic flair and sound effects."
              cardWidth="w-full"
            />
            
            <InfoCard
              cardIconFa="fa-solid fa-gamepad"
              cardTitle="Interactive Trivia"
              cardDescription="Test your Scaremoor knowledge in fun trivia nights with prizes for the biggest fans."
              cardWidth="w-full"
            />
            
            <InfoCard
              cardIconFa="fa-solid fa-comments"
              cardTitle="Q&A Sessions"
              cardDescription="Ask T.L. Griffith your burning questions about the books, characters, and writing process."
              cardWidth="w-full"
            />
          </div>
        </section>

        {/* Technical Requirements Section */}
        <section className="px-8 md:px-20 py-20 space-y-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg p-8 border border-blue-700/30">
              <h3 className="font-trickordead text-3xl mb-6 text-blue-400 text-center">
                How to Join Virtual Events
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-3">What You Need:</h4>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Computer, tablet, or smartphone</li>
                    <li>• Stable internet connection</li>
                    <li>• Zoom, YouTube, or specified platform</li>
                    <li>• Optional: webcam and microphone for interaction</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-3">How It Works:</h4>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Register for the event online</li>
                    <li>• Receive a link via email before the event</li>
                    <li>• Join at the scheduled time</li>
                    <li>• Participate via chat or audio (when enabled)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="px-8 md:px-20 py-20 space-y-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-orange-900/20 to-yellow-900/20 rounded-lg p-8 border border-orange-700/30">
              <h3 className="font-trickordead text-3xl mb-4 text-orange-400">
                Have an Idea for a Virtual Event?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                We're always looking for creative ways to connect with Scaremoor fans online! 
                Whether it's a themed trivia night, character discussion, or something completely new.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    buttonImage={OrangeBackgroundMd}
                    altText="contact-virtual"
                    text="Suggest an Event"
                  />
                </Link>
                <Link href="/events">
                  <Button
                    buttonImage={YellowBackground}
                    altText="all-events"
                    text="See All Events"
                    textColor="text-black"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default VirtualEventsPage;