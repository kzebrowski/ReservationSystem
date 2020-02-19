namespace Services
{
    public interface IActivationCodeService
    {
        string CreateNew(string email);

        bool Validate(string code, string email);
    }
}
