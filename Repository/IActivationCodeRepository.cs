using System;
using System.Collections.Generic;
using Repository.Entities;

namespace Repository
{
    public interface IActivationCodeRepository
    {
        ActivationCodeEntity Add(ActivationCodeEntity activationCode);

        IEnumerable<ActivationCodeEntity> GetAllForUser(string email);
    }
}
