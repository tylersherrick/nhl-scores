import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NHLScores() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard');
        setGames(response.data.events);
        setLoading(false);
        console.log(response)
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const fetchGameDetails = async (gameId) => {
    try {
      const response = await axios.get(`https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/summary?event=${gameId}`);
      setSelectedGame(response.data);
    } catch (err) {
      console.error('Error fetching game details');
    }
  };

  const handleGameClick = (gameId) => {
    fetchGameDetails(gameId);
  };


  const toggleShowAll = () => {
    if (selectedGame) {
      setSelectedGame(null); // Reset selected game to show the list again
    } else {
      setShowAll(!showAll); // Toggle showAll if no game is selected
    }
  };

  if (loading) return <p className=''>Loading...</p>;
  if (error) return <p className=''>{error}</p>;

  return (
    <div className="nhl-scores">
      <h3 className='league-name' onClick={toggleShowAll}>
        NHL
        {selectedGame ? (
          <button className='show-less-btn'>Back to Games</button>
        ) : (
          showAll && <button className='show-less-btn'>Show Less</button>
        )}
      </h3>

      {selectedGame ? (
        <div className="nhl-data">
          <div className="game-row">
            <div className="game-info">
              <p className="game-details">
                {selectedGame.header.competitions[0].status.type.detail}
              </p>
              <br />
              <p className="game-details">{selectedGame.header.competitions[0].competitors[1].team.displayName}</p>
              <p>{selectedGame.header.competitions[0].competitors[0].team.displayName}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="nhl-data">
          {(showAll ? games : games.slice(0, 3)).map((game) => (
            <div className="game-row" key={game.id} onClick={() => handleGameClick(game.id)}>
              <div className="game-info">
                <p className="game-details">{game.status.type.detail}</p>
                <br />
                <p className="game-details">{game.competitions[0].competitors[1].team.displayName}</p>
                <p>{game.competitions[0].competitors[0].team.displayName}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NHLScores;
