import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Herobox from "../../components/Herobox";
import Button from "../../components/Button";
import InfoCard from "../../components/InfoCard";
import {
  getEventsByType,
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
  title: "Book Signings",
  description: "Meet T.L. Griffith in person at upcoming book signings. Get your Scaremoor books signed and chat with the author about your favorite spine-tingling moments.",
  openGraph: {
    title: "Scaremoor Book Signings | Meet the Author",
    description: "Meet T.L. Griffith in person at upcoming book signings and events.",
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
      </div>
    </div>
  );
};

const BookSigningsPage = () => {
  const bookSigningEvents = getEventsByType('book-signing').filter(event => event.status === 'upcoming');
  const bookLaunchEvents = getEventsByType('book-launch').filter(event => event.status === 'upcoming');
  const allSigningEvents = [...bookSigningEvents, ...bookLaunchEvents].sort((a, b) => 
    a.startDate.getTime() - b.startDate.getTime()
  );

  return (
    <>
      <Herobox backgroundImage={BackgroundImage} contentPaddingTop="lg:pt-22">
        <div className="items-center">
          <div className="space-y-5 lg:pt-10">
            <div className="font-trickordead font-normal space-y-4 [text-shadow:0_0_10px_rgba(0,0,0,0.8)]">
              <h2 className="hero-text-large">Meet the Author.</h2>
              <h1 className="hero-text-xlarge max-w-[20ch]">
                Book Signings & Launches.
              </h1>
            </div>

            <p
              className="max-w-[80ch] font-light"
              style={{
                textShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
              }}
            >
              Meet T.L. Griffith in person at bookstores, libraries, and special events. 
              Get your Scaremoor books signed, take photos, and chat about your favorite 
              spine-tingling moments with fellow fans and the author.
            </p>

            <div className="flex flex-col sm:flex-row pt-8 gap-5">
              <Link href="#signing-events">
                <Button
                  buttonImage={OrangeBackgroundMd}
                  altText="view-signings"
                  text="View Signings"
                />
              </Link>

              <Link href="/contact">
                <Button
                  buttonImage={YellowBackground}
                  altText="request-signing"
                  text="Request a Signing"
                  textColor="text-black"
                />
              </Link>
            </div>
          </div>
        </div>
      </Herobox>

      <main className="text-white">
        {/* Book Signing Events Section */}
        <section
          id="signing-events"
          className="px-8 md:px-20 py-20 min-h-180 h-full relative overflow-hidden space-y-6"
        >
          <div className="text-center space-y-6 relative z-50">
            <h2 className="font-trickordead font-normal text-4xl sm:text-6xl capitalize gradient-text-accessible">
              Upcoming Book Signings
            </h2>
            <p className="max-w-[60ch] mx-auto">
              Don&apos;t miss these opportunities to meet T.L. Griffith in person! 
              Perfect for getting books signed and connecting with the Scaremoor community.
            </p>
          </div>

          <div className="pt-12 relative z-50">
            {allSigningEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {allSigningEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">✍️</div>
                <h3 className="text-2xl text-gray-300 mb-2">No Upcoming Signings</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  Check back soon for new book signing events, or contact us to request 
                  T.L. Griffith visit your local bookstore or library!
                </p>
                <Link href="/contact" className="inline-block mt-6">
                  <Button
                    buttonImage={OrangeBackgroundMd}
                    altText="request-signing"
                    text="Request a Signing"
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

        {/* What to Expect Section */}
        <section className="px-8 md:px-20 py-20 space-y-8">
          <div className="text-center space-y-6">
            <h2 className="font-trickordead font-normal text-4xl sm:text-6xl capitalize gradient-text-accessible pb-12">
              What to Expect at Our Signings
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-8 lg:px-12">
            <InfoCard
              cardIconFa="fa-solid fa-pen-fancy"
              cardTitle="Book Signing"
              cardDescription="Get your Scaremoor books personally signed by T.L. Griffith with custom messages and dedications."
              cardWidth="w-full"
            />
            
            <InfoCard
              cardIconFa="fa-solid fa-camera"
              cardTitle="Photo Opportunities"
              cardDescription="Take photos with the author and share your Scaremoor fan moments on social media."
              cardWidth="w-full"
            />
            
            <InfoCard
              cardIconFa="fa-solid fa-comments"
              cardTitle="Meet & Greet"
              cardDescription="Chat with T.L. Griffith about the books, characters, and what's coming next in the series."
              cardWidth="w-full"
            />
          </div>
        </section>

        {/* Contact Section */}
        <section className="px-8 md:px-20 py-20 space-y-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-orange-900/20 to-yellow-900/20 rounded-lg p-8 border border-orange-700/30">
              <h3 className="font-trickordead text-3xl mb-4 text-orange-400">
                Want a Signing at Your Location?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Bookstore owner? Librarian? Event coordinator? We&apos;d love to bring T.L. Griffith 
                to your location for a book signing event that will thrill young horror fans!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    buttonImage={OrangeBackgroundMd}
                    altText="contact-signing"
                    text="Request a Signing"
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

export default BookSigningsPage;