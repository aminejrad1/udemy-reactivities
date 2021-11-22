using MediatR;
using Microsoft.AspNetCore.Mvc;
namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] 
    public class BaseApiController: ControllerBase
    {
        private IMediator _mediator;
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices
                                                                 .GetRequiredService<IMediator>();   //if mediator is not null =_mediator,
                                                                                                     //if _mediator=null => request the mediator service from the services
    }
}