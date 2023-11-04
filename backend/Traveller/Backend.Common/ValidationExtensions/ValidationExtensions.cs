using Common.Exceptions;
using FluentValidation.Results;

namespace Common.ValidationExtensions
{
    public static class ValidationExtensions
    {
        public static void ThenThrow(this ValidationResult result)
        {
            if (!result.IsValid)
            {
                throw new ValidationErrorException(result);
            }
        }
    }
}
