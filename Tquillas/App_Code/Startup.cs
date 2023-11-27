using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Tquillas.Startup))]
namespace Tquillas
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
