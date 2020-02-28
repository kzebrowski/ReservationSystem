using System;
using System.Linq;
using Repository;
using Repository.Entities;

namespace Services
{
    public class ActivationCodeService: IActivationCodeService
    {
        private const int CodeLength = 6;
        private const int CodeLifeTime = 120;
        private readonly IActivationCodeRepository _activationCodeRepository;
        private readonly IUserService _userService;

        public ActivationCodeService(IActivationCodeRepository activationCodeRepository, IUserService userService)
        {
            _activationCodeRepository = activationCodeRepository;
            _userService = userService;
        }

        public string CreateNew(string email)
        {
            var user = _userService.GetByEmail(email);
            var code = GenerateCode();

            var newActivationCode = new ActivationCodeEntity
            {
                UserId = user.Id,
                TimeCreated = DateTime.Now,
                Code = code
            };

            _activationCodeRepository.Add(newActivationCode);

            return code;
        }

        public bool Validate(string code, string email)
        {
            var codes = _activationCodeRepository.GetAllForUser(email).ToList();
            var latestCode = codes.SingleOrDefault(x => x.TimeCreated == codes.Max(c => c.TimeCreated));
            var timeSpan = DateTime.Now - latestCode?.TimeCreated;

            return latestCode?.Code == code && timeSpan?.Minutes < CodeLifeTime;
        }

        private string GenerateCode()
        {
            var rnd = new Random();
            var code = String.Empty;

            for (var i = 0; i < CodeLength; i++)
            {
                var digit = rnd.Next(0, 9);
                code += digit;
            }

            return code;
        }
    }
}
