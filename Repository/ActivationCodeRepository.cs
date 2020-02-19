using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Repository.Entities;

namespace Repository
{
    public class ActivationCodeRepository: IActivationCodeRepository
    {
        private ReservationSystemContext _context;

        public ActivationCodeRepository(ReservationSystemContext context)
        {
            _context = context;
        }

        public ActivationCodeEntity Add(ActivationCodeEntity activationCode)
        {
            _context.ActivationCodes.Add(activationCode);
            _context.SaveChanges();

            return activationCode;
        }

        public IEnumerable<ActivationCodeEntity> GetAllForUser(string email)
        {
            return _context.ActivationCodes
                .Include(x => x.User)
                .Where(x => x.User.Email == email);
        }
    }
}
