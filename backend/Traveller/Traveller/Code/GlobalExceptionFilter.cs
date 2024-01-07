using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System;
using BusinessLogic.Implementation.UserAccount;
using Common.Exceptions;

namespace PetsHub.Code
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
    public sealed class GlobalExceptionFilterAttribute : ExceptionFilterAttribute
    {
        private readonly ILogger<GlobalExceptionFilterAttribute> logger;

        public GlobalExceptionFilterAttribute(ILogger<GlobalExceptionFilterAttribute> logger)
        {
            this.logger = logger;
        }

        public override void OnException(ExceptionContext context)
        {
            context.ExceptionHandled = true;
            var descriptor = context.ActionDescriptor as ControllerActionDescriptor;
            switch (context.Exception)
            {
                case NotFoundErrorException notFound:
                    context.Result = new ViewResult
                    {
                        ViewName = "Views/Shared/Error_NotFound.cshtml"
                    };

                    break;
                case UnauthorizedAccessException unauthorizedAccess:
                    context.Result = new ViewResult
                    {
                        ViewName = "Views/Shared/Error_Unauthorized.cshtml"
                    };
                    break;
                case ValidationErrorException validationError:
                    foreach (var validationResult in validationError.ValidationResult.Errors)
                    {
                        context.ModelState.AddModelError(validationResult.PropertyName, validationResult.ErrorMessage);
                    }

                    //var hasRequestedWithHeader = context.HttpContext.Request.Headers.TryGetValue("X-Requested-With", out var requestedWithHeaderValue);

                    /*if ((hasRequestedWithHeader && requestedWithHeaderValue == "XMLHttpRequest") )*/

                    //context.Result = new StatusCodeResult(StatusCodes.Status412PreconditionFailed);
                    context.Result = new ObjectResult(validationError.ValidationResult.Errors.Select(e => new { e.PropertyName, e.ErrorMessage }))
                    {
                        StatusCode = StatusCodes.Status412PreconditionFailed
                    };




                    break;
                default:
                    context.Result = new ViewResult
                    {
                        ViewName = "Views/Shared/Error_InternalServerError.cshtml"
                    };
                    break;

            }
        }
    }
}
