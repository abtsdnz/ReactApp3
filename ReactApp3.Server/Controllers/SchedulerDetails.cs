using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace ReactApp3.Server.Controllers
{
    public record Court(string Name);
    public record Row(int Duration);
    public record AllocatedSlot(int Row, int Col, string Contents);

    // SchedulerData model to encapsulate both courts and rows
    public class SchedulerData
    {
        public List<Court>? Courts { get; set; }
        public List<Row>? Rows { get; set; }
        public List<AllocatedSlot>? AllocatedSlots { get; set; }
    }

    [ApiController]
    [Route("[controller]")]
    public class SchedulerDetailsController : ControllerBase
    {
        [HttpGet]
        public ActionResult<SchedulerData> Get([FromQuery] string date)
        {
            // Ensure the date format is correct
            if (string.IsNullOrEmpty(date) || !date.Contains('-'))
                return BadRequest("Invalid date format. Expected format: dd-MM-yyyy.");

            var parts = date.Split('-');

            // Check if the parts array has exactly three elements
            if (parts.Length != 3)
                return BadRequest("Invalid date format. Expected format: dd-MM-yyyy.");

            // Parse day, month, and year
            if (!int.TryParse(parts[0], out var day))
                return BadRequest("Invalid day. Must be an integer.");

            if (!int.TryParse(parts[1], out var month))
                return BadRequest("Invalid month. Must be an integer.");

            if (!int.TryParse(parts[2], out var year))
                return BadRequest("Invalid year. Must be an integer.");

            DateOnly checkDate;
            try
            {
                checkDate = new DateOnly(year, month, day);
            }
            catch (ArgumentOutOfRangeException)
            {
                return BadRequest("Invalid date. Please ensure the day and month are valid.");
            }

            List<Court> courts = [.. Enumerable.Range(1, 11).Select(index => new Court("Court" + index))];
            List<Row> rows = [.. Enumerable.Range(1, 48).Select(index => new Row(30))];
            List<AllocatedSlot> allocatedSlots = [];

            // Encapsulate courts and rows into SchedulerData
            var schedulerData = new SchedulerData
            {
                Courts = courts,
                Rows = rows,
                AllocatedSlots = allocatedSlots,
            };

            // Return the data
            return Ok(schedulerData);
        }
    }
}
