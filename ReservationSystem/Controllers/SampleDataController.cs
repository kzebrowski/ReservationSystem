using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ReservationSystem.ViewModels
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }

        [HttpGet("[action]")]
        public IEnumerable<RoomViewModel> Rooms()
        {
            return RoomViewModel.GetSampleData();
        }

        [HttpGet("[action]")]
        public IEnumerable<RoomViewModel> Search(string startDate, string endDate, int numberOfGuests)
        {
            return RoomViewModel.GetSampleData().Where(x => x.Capacity >= numberOfGuests);
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }

        public class RoomViewModel
        {
            public Guid ID { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public int Price { get; set; }
            public int Capacity { get; set; }
            public string ImageUrl { get; set; }

            public static IEnumerable<RoomViewModel> GetSampleData()
            {
                yield return new RoomViewModel
                {
                    ID = Guid.NewGuid(),
                    Title = "Przytulny pokój dwuosobowy",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur posuere ante, a bibendum sem. Nullam ac sem quis lectus mollis congue. Maecenas nisl urna, varius non cursus a, accumsan id purus.",
                    Capacity = 2,
                    Price = 120,
                    ImageUrl = "https://lodgeatgulfstatepark.com/wp-content/uploads/2019/07/lodge_guest_room.jpg"
                };

                yield return new RoomViewModel
                {
                    ID = Guid.NewGuid(),
                    Title = "Rodzinny pokój czteroosobowy",
                    Description = "Curabitur placerat tellus turpis, ut tempus ante congue sed. Morbi viverra bibendum justo vel imperdiet. Aliquam in faucibus neque, quis viverra tortor. Etiam in quam et ante rhoncus egestas sed eu mi.",
                    Capacity = 4,
                    Price = 180,
                    ImageUrl = "https://www.medbeach.com/wp-content/uploads/2018/07/deluxe-sea-view-room-500x300.jpg"
                };

                yield return new RoomViewModel
                {
                    ID = Guid.NewGuid(),
                    Title = "Willa u Pudziana",
                    Description = "Curabitur vulputate egestas nunc. Donec varius, dui et dictum pharetra, ante risus vestibulum tellus, in varius erat ipsum ac nisi. Cras aliquet a enim vitae fermentum. Sed dolor nulla, vestibulum eget suscipit eget, malesuada ut enim.",
                    Capacity = 8,
                    Price = 3000,
                    ImageUrl = "data:image/jpeg;base64,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"
                };
            }
        }
    }
}
