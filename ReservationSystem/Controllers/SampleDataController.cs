using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ReservationSystem.Controllers
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
            public string Title { get; set; }
            public string Desctiption { get; set; }
            public int Price { get; set; }
            public int Capacity { get; set; }

            public static IEnumerable<RoomViewModel> GetSampleData()
            {
                yield return new RoomViewModel
                {
                    Title = "Przytulny pokój dwuosobowy",
                    Desctiption = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur posuere ante, a bibendum sem. Nullam ac sem quis lectus mollis congue. Maecenas nisl urna, varius non cursus a, accumsan id purus.",
                    Capacity = 2,
                    Price = 120
                };

                yield return new RoomViewModel
                {
                    Title = "Rodzinny pokój czteroosobowy",
                    Desctiption = "Curabitur placerat tellus turpis, ut tempus ante congue sed. Morbi viverra bibendum justo vel imperdiet. Aliquam in faucibus neque, quis viverra tortor. Etiam in quam et ante rhoncus egestas sed eu mi.",
                    Capacity = 4,
                    Price = 180
                };

                yield return new RoomViewModel
                {
                    Title = "Willa u Pudziana",
                    Desctiption = "Curabitur vulputate egestas nunc. Donec varius, dui et dictum pharetra, ante risus vestibulum tellus, in varius erat ipsum ac nisi. Cras aliquet a enim vitae fermentum. Sed dolor nulla, vestibulum eget suscipit eget, malesuada ut enim.",
                    Capacity = 8,
                    Price = 3000
                };
            }
        }
    }
}
