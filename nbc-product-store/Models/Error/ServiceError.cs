namespace Mc4b.Models.Error
{
    public class ServiceError
    {
        public string ErrorCode;
        public string ErrorMessage;

        public ServiceError() { }
        public ServiceError(string errorCode, string errorMessage)
        {
            ErrorCode = errorCode;
            ErrorMessage = errorMessage;
        }

    }
}
