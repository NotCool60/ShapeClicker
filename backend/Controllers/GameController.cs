using Microsoft.AspNetCore.Mvc;
using ShapeClickerApi.Models;
using System.Collections.Concurrent;

namespace ShapeClickerApi.Controllers
{
    [ApiController]
    [Route("api/game")]
    public class GameController : ControllerBase
    {
        private static readonly ConcurrentDictionary<string, GameState> _gameStates = new();

        [HttpGet("load")]
        public IActionResult LoadGame([FromQuery] string userId = "default")
        {
            if (_gameStates.TryGetValue(userId, out var gameState))
            {
                return Ok(gameState);
            }
            return NotFound("No saved game found for this user.");
        }

        [HttpPost("save")]
        public IActionResult SaveGame([FromBody] GameState gameState, [FromQuery] string userId = "default")
        {
            _gameStates[userId] = gameState;
            return Ok("Game saved successfully.");
        }

        [HttpDelete("delete")]
        public IActionResult DeleteGame([FromQuery] string userId = "default")
        {
            _gameStates.TryRemove(userId, out _);
            return Ok("Game deleted successfully.");
        }
    }
}