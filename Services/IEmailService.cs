using System.Threading.Tasks;

namespace Services
{
    public interface IEmailService
    {
        Task SendActivationCode(string email, string code);
    }
}
