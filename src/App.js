import React, { useState } from "react";
import './App.css';

const destinationsData = [
  { id: 1, name: "Amba Mata Trek", location: "Jaipur", difficulty: "Hard", bestSeason: "April - May", image: "https://trekkingmantra.com/uploads/db5b5426a5e69560573edb16b1933305.jpg" },
  { id: 2, name: "Mariyam Mahal Trek", location: "Jaipur", difficulty: "Moderate", bestSeason: "May - September", image: "https://trekkingmantra.com/uploads/0aa1b3ca9ad18eb8972e427fa34fc029.jpg" },
  { id: 3, name: "Twin Tower Trek", location: "Jaipur", difficulty: "Hard", bestSeason: "January - March", image: "https://trekkingmantra.com/uploads/0d7d2f2c2b39a7afcdc46bd502759521.jpg" },
  { id: 4, name: "Heritage Valley", location: "Jaipur", difficulty: "Moderate", bestSeason: "March - May", image: "https://trekkingmantra.com/uploads/f6238ca4a7d3725fc2e46a0ada803f26.jpg" },
  { id: 5, name: "Kedarnath Trek", location: "Jaipur", difficulty: "Moderate", bestSeason: "October - April", image: "https://trekkingmantra.com/uploads/6928f69c473be54abf06e3bfc114330c.jpg" },
  { id: 6, name: "Chabutra Trek", location: "Jaipur", difficulty: "Easy", bestSeason: "June - September", image: "https://trekkingmantra.com/uploads/3776b3c96cf8aa34d7305037df4efa91.jpg" },
  { id: 7, name: "Ban Ki Ghati Trek", location: "Jaipur", difficulty: "Moderate", bestSeason: "June - September", image: "https://trekkingmantra.com/uploads/7ea2befc875b6e3951673db5a15301fb.jpeg" },
  { id: 8, name: "Saan Valley Trek", location: "Jaipur", difficulty: "Hard", bestSeason: "July - August", image: "https://trekkingmantra.com/uploads/a539fc1172e50136c2b60725e5535036.jpeg" },
  { id: 9, name: "Achrol Fort trek", location: "Jaipur", difficulty: "Easy", bestSeason: "November - March", image: "https://trekkingmantra.com/uploads/bf505340d5bea4af46db8730892bd2e5.jpg" },
  { id: 10, name: "Mount Sumel Trek", location: "Jaipur", difficulty: "Moderate", bestSeason: "September - November", image: "https://trekkingmantra.com/uploads/6ec041b4b94c0b86f41896003010419a.PNG" },
];

function App() {
  const [visibleCount, setVisibleCount] = useState(3); // Initial count to show 3 items
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDestinationClick = (destination) => setSelectedDestination(destination);
  const handleCloseModal = () => setSelectedDestination(null);
  const handleSearch = (event) => setSearchQuery(event.target.value);

  const filteredDestinations = destinationsData.filter((destination) =>
    destination.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle the "See More" button click
  const handleSeeMore = () => {
    setVisibleCount(visibleCount + 3); // Increase visible count by 3 on each click
  };

  return (
    <div className="App">
      {/* Navigation Panel */}
      <nav className="nav-bar">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="#destinations">Destinations</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <h1>Trekking Destinations</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search destinations..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="destination-list">
        {filteredDestinations.length > 0 ?
          <>
            {filteredDestinations.slice(0, visibleCount).map((destination) => (
              <div key={destination.id} className="destination-item" onClick={() => handleDestinationClick(destination)}>
                <h3>{destination.name}</h3>
                <p>{destination.location}</p>
                <img src={destination.image} alt={destination.name} className="destination-image" />
              </div>
            ))}
          </>
        : 
          <h3 style={{color:"#000"}}>No data found</h3>
        }
      </div>

      {/* Show "See More" button only if there are more destinations to display */}
      {visibleCount < filteredDestinations.length && (
        <button className="see-more-btn" onClick={handleSeeMore}>See More</button>
      )}

      {/* Modal Component */}
      {selectedDestination && <Modal destination={selectedDestination} onClose={handleCloseModal} />}
    </div>
  );
}

export default App;

const Modal = ({ destination, onClose }) => {
  if (!destination) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{destination.name}</h2>
        <p><strong>Location:</strong> {destination.location}</p>
        <p><strong>Difficulty:</strong> {destination.difficulty}</p>
        <p><strong>Best Season:</strong> {destination.bestSeason}</p>
        <img src={destination.image} alt={destination.name} className="destination-image" />
      </div>
    </div>
  );
};
