using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                if (this._context.Activities.FindAsync(request.Id).Result == null)
                {
                    return Unit.Value;
                }
                else
                {
                    Activity activity = this._context.Activities.FindAsync(request.Id).Result;
                    this._context.Remove<Activity>(activity);
                    await _context.SaveChangesAsync();
                }
                return Unit.Value;
            }
        }
    }
}
