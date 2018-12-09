import { AuthorizeStep } from 'aurelia-auth';

export class App {
  configureRouter(config, router) {
    this.router = router;
    config.addPipelineStep('authorize', AuthorizeStep);
    config.map([
      {
        route: ['', 'landing'],
        moduleId: './modules/landing',
        name: 'Landing',
        auth: false
      },
      {
        route: 'home',
        moduleId: './modules/home',
        name: 'Home',
        auth: true
      },
      {
        route: 'foos',
        moduleId: './modules/foos',
        name: 'Foos',
        auth: true
      },
      {
        route: 'helpTickets',
        moduleId: './modules/helpTickets',
        name: 'HelpTickets',
        auth: true
      }
    ])
  }
}
