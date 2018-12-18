define('app',["exports", "aurelia-auth"], function (_exports, _aureliaAuth) {
  "use strict";

  _exports.__esModule = true;
  _exports.App = void 0;

  var App =
  /*#__PURE__*/
  function () {
    function App() {}

    var _proto = App.prototype;

    _proto.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.addPipelineStep('authorize', _aureliaAuth.AuthorizeStep);
      config.map([{
        route: ['', 'landing'],
        moduleId: './modules/landing',
        name: 'Landing',
        auth: false
      }, {
        route: 'home',
        moduleId: './modules/home',
        name: 'Home',
        auth: true
      }, {
        route: 'users',
        moduleId: './modules/users',
        name: 'Users',
        auth: true
      }, {
        route: 'helpTickets',
        moduleId: './modules/helpTickets',
        name: 'HelpTickets',
        auth: true
      }]);
    };

    return App;
  }();

  _exports.App = App;
});
define('text!app.html',[],function(){return "<template>\n  <nav-bar></nav-bar>\n  <router-view></router-view>\n</template>";});
define('auth-config',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = void 0;
  var authConfig = {
    baseUrl: "http://localhost:5000/api",
    loginUrl: '/users/login',
    tokenName: 'token',
    authHeader: 'Authorization',
    authToken: '',
    logoutRedirect: '#/landing'
  };
  var _default = authConfig;
  _exports.default = _default;
});
define('environment',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = void 0;
  var _default = {
    debug: true,
    testing: true
  };
  _exports.default = _default;
});
define('main',["exports", "./environment", "./auth-config"], function (_exports, _environment, _authConfig) {
  "use strict";

  _exports.__esModule = true;
  _exports.configure = configure;
  _environment = _interopRequireDefault(_environment);
  _authConfig = _interopRequireDefault(_authConfig);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().plugin('aurelia-auth', function (baseConfig) {
      baseConfig.configure(_authConfig.default);
    }).feature('resources');
    aurelia.use.developmentLogging(_environment.default.debug ? 'debug' : 'warn');

    if (_environment.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    return aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('text!modules/components/editHelpTicket.html',[],function(){return "<template>\r\n\r\n    <div class=\"container\">\r\n\r\n        <div class=\"row justify-content-center\">\r\n\r\n            <div class=\"col-8\">\r\n\r\n                <div class=\"list-group-item\">\r\n\r\n                    <span click.trigger=\"back()\"><i data-feather=\"arrow-left-circle\"></i></span>\r\n\r\n                    <span click.trigger=\"save()\" style=\"margin-left:5px;\"><i data-feather=\"save\"></i></span>\r\n\r\n                    <span show.bind=\"helpTicket._id\" click.trigger=\"delete()\"><i data-feather=\"trash-2\"></i></span>\r\n\r\n                </div>\r\n\r\n                <form>\r\n\r\n                    <div class=\"form-group\" style=\"margin-top:20px;\">\r\n\r\n                        <label for=\"title\">Title</label>\r\n\r\n                        <input type=\"text\" readonly.bind=\"helpTicket._id\" class=\"form-control\" value.bind=\"helpTicket.title\"\r\n                            id=\"title\" placeholder=\"Title\">\r\n\r\n                    </div>\r\n\r\n\r\n\r\n                    <div class=\"form-group\" style=\"margin-top:20px;\">\r\n\r\n                        <label for=\"content\">Description</label>\r\n\r\n                        <textarea value.bind=\"helpTicketContent.content\" class=\"form-control\" rows=\"8\"></textarea>\r\n\r\n                    </div>\r\n\r\n\r\n\r\n                    <div class=\"card\" repeat.for=\"content of helpTickets.helpTicketsContentArray\">\r\n\r\n                        <div class=\"card-body\">\r\n\r\n                            <div class=\"row\" style=\"padding:3px;\">\r\n\r\n                                <div class=\"col-3\">\r\n\r\n                                    <span innerhtml.bind=\"content.dataCreated | formatDate\"></span><br />\r\n\r\n                                    ${content.personId.firstName} ${content.personId.lastName}\r\n\r\n                                </div>\r\n\r\n                                <div class=\"col-9\" style=\"border-left-style: solid;border-left-width: 1px;\">\r\n\r\n                                    ${content.content}\r\n\r\n                                </div>\r\n\r\n                            </div>\r\n\r\n                        </div>\r\n\r\n                    </div>\r\n\r\n                </form>\r\n\r\n            </div>\r\n\r\n        </div>\r\n\r\n    </div>\r\n\r\n</template>";});
define('text!modules/components/editUsers.html',[],function(){return "<template>\r\n    <div class=\"container\">\r\n        <div class=\"row justify-content-center\">\r\n            <div class=\"col-8\">\r\n                <div class=\"form-group\" style=\"margin-top:20px;\">\r\n                    <label for=\"firstName\">First name</label>\r\n                    <input type=\"email\" class=\"form-control\" value.bind=\"user.firstName\" id=\"firstName\" placeholder=\"First name\">\r\n                </div>\r\n\r\n                <div class=\"form-group\" style=\"margin-top:20px;\">\r\n                    <label for=\"lastName\">Last name</label>\r\n                    <input type=\"email\" class=\"form-control\" value.bind=\"user.lastName\" id=\"lastName\" placeholder=\"Last name\">\r\n                </div>\r\n\r\n                <div class=\"form-group\" style=\"margin-top:20px;\">\r\n                    <label for=\"email\">Email address</label>\r\n                    <input type=\"email\" class=\"form-control\" value.bind=\"user.email\" id=\"email\" placeholder=\"Email address\">\r\n                </div>\r\n\r\n                <div class=\"form-group\" style=\"margin-top:20px;\">\r\n                    <label for=\"password\">Password</label>\r\n                    <input type=\"email\" class=\"form-control\" value.bind=\"user.password\" id=\"password\" placeholder=\"Password\">\r\n                </div>\r\n\r\n                <div class=\"form-group\">\r\n                    <label for=\"role\" value.bind=\"user.role\">Role</label>\r\n                    <select class=\"form-control\" id=\"role\">\r\n                        <option value=\"user\">User</option>\r\n                        <option value=\"staff\">Staff</option>\r\n                        <option value=\"admin\">Administrator</option>\r\n                    </select>\r\n                </div>\r\n\r\n                <div class=\"form-check\">\r\n                    <input class=\"form-check-input\" checked.bind=\"user.active\" type=\"checkbox\" value=\"\" id=\"defaultCheck1\">\r\n                    <label class=\"form-check-label\" for=\"defaultCheck1\">\r\n                        Active\r\n                    </label>\r\n                </div>\r\n\r\n                <div class=\"list-group-item\">\r\n                    <span click.trigger=\"back()\"><i data-feather=\"arrow-left-circle\"></i></span>\r\n                    <span click.trigger=\"save()\" style=\"margin-left:5px;\"><i data-feather=\"save\"></i></span>\r\n                    <span show.bind=\"user._id\" click.trigger=\"delete()\"><i data-feather=\"trash-2\"></i></span>\r\n                </div>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";});
define('text!modules/components/tableHelpTickets.html',[],function(){return "<template>\r\n    <div class=\"container\">\r\n        <div class=\"row justify-content-center\">\r\n            <div class=\"col-8\">\r\n                <table class=\"table table-striped\">\r\n                    <thead>\r\n                        <thead>\r\n                            <tr>\r\n                                <th colspan=\"4\">\r\n                                    <span click.trigger=\"newHelpTicket()\"><i data-feather=\"plus\"></i></span>\r\n                                    <span click.trigger=\"getHelpTicket()\" style=\"margin-left:5px;\"><i data-feather=\"refresh-cw\"></i></span>\r\n                                </th>\r\n                            </tr>\r\n                            <tr>\r\n                                <th scope=\"col\">Title</th>\r\n                                <th scope=\"col\">Status</th>\r\n                                <th scope=\"col\">Submitted By</th>\r\n                                <th scope=\"col\">Assigned To</th>\r\n                            </tr>\r\n                        </thead>\r\n                    <tbody>\r\n                        <tr click.trigger=\"editHelpTicket(helpTicket)\" repeat.for=\"helpTicket of helpTickets.helpTicketsArray\">\r\n                            <td>${helpTicket.title}</td>\r\n                            <td>${helpTicket.status}</td>\r\n                            <td>${helpTicket.personId.firstName} ${helpTicket.personId.lastName} </td>\r\n                            <td>${helpTicket.ownerId.firstName} ${helpTicket.ownerId.lastName} </td>\r\n                        </tr>\r\n                       \r\n                       \r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";});
define('text!modules/components/tableUsers.html',[],function(){return "<template>\r\n    <div class=\"container\">\r\n        <div class=\"row justify-content-center\">\r\n            <div class=\"col-8\">\r\n                <table class=\"table table-striped\">\r\n                    <thead>\r\n                        <thead>\r\n                            <tr>\r\n                                <th colspan=\"4\">\r\n                                    <span click.trigger=\"newUser()\"><i data-feather=\"plus\"></i></span>\r\n                                    <span click.trigger=\"getUsers()\" style=\"margin-left:5px;\"><i data-feather=\"refresh-cw\"></i></span>\r\n                                </th>\r\n                            </tr>\r\n                            <tr>\r\n                                <th scope=\"col\">First</th>\r\n                                <th scope=\"col\">Last</th>\r\n                                <th scope=\"col\">Role</th>\r\n                                <th scope=\"col\">Active</th>\r\n                            </tr>\r\n                        </thead>\r\n                    <tbody>\r\n\r\n                        <tr repeat.for=\"user of users.usersArray\">\r\n                            <td click.trigger=\"editUser(user)\">${user.firstName}</td>\r\n                            <td click.trigger=\"editUser(user)\">${user.lastName}</td>\r\n                            <td click.trigger=\"editUser(user)\">${user.role}</td>\r\n                            <td>\r\n                                    <div class=\"form-check\">\r\n                                            <input class=\"form-check-input\" change.delegate=\"changeActive(user)\" checked.bind=\"user.active\"\r\n                                            type=\"checkbox\" value=\"\" id=\"defaultCheck1\">\r\n                                            </div>\r\n                            </td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";});
define('modules/helpTickets',["exports", "aurelia-framework", "aurelia-router", "../resources/data/help-ticket-object"], function (_exports, _aureliaFramework, _aureliaRouter, _helpTicketObject) {
  "use strict";

  _exports.__esModule = true;
  _exports.HelpTickets = void 0;

  var _dec, _class;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  // @inject(Router, HelpTicket)
  // export class HelpTickets {
  //     constructor(router, helpTickets) {
  //         this.router = router;
  //         this.helpTickets = helpTickets;
  //         this.message = 'Help Tickets';
  //         this.showHelpTicketEditForm = false;
  //     }
  //     back() {
  //         this.showHelpTicketEditForm = false;
  //         this.showHelpTicketDisplayForm = false;
  //         this.filesToUpload = new Array();
  //         this.files = new Array();
  //     }
  // changeFiles() {
  //     this.filesToUpload = this.filesToUpload ? this.filesToUpload : new Array();
  //     for (var i = 0; i < this.files.length; i++) {
  //         let addFile = true;
  //         this.filesToUpload.forEach(item => {
  //             if (item.name === this.files[i].name) addFile = false;
  //         })
  //         if (addFile) this.filesToUpload.push(this.files[i]);
  //     }
  //     }
  //     async save() {
  //         if (this.helpTicket && this.helpTicket.title && this.helpTicketContent && this.helpTicketContent.content) {
  //             if (this.userObj.role === 'staff' || this.userObj.role === 'admin') {
  //                 this.helpTicket.ownerId = this.userObj._id;
  //             }
  //             let helpTicket = { helpTicket: this.helpTicket, content: this.helpTicketContent }
  //             let serverResponse = await this.helpTickets.saveHelpTicket(helpTicket);
  //             if (this.filesToUpload && this.filesToUpload.length > 0) this.helpTickets.uploadFile(this.filesToUpload,
  //                 serverResponse.contentID);
  //             await this.getHelpTickets();
  //             this.back();
  //         }
  //     }
  // }
  var HelpTickets = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _helpTicketObject.HelpTicket), _dec(_class =
  /*#__PURE__*/
  function () {
    function HelpTickets(router, helpTicket) {
      this.helpTickets = helpTicket;
      this.showHelpTicketEditForm = false;
      this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
    }

    var _proto = HelpTickets.prototype;

    _proto.activate =
    /*#__PURE__*/
    function () {
      var _activate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.helpTickets.getHelpTickets(this.userObj);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function activate() {
        return _activate.apply(this, arguments);
      }

      return activate;
    }();

    _proto.attached = function attached() {
      feather.replace();
    };

    _proto.showEditForm = function showEditForm() {
      this.showHelpTicketEditForm = true;
      setTimeout(function () {
        $("#firstName").focus();
      }, 500);
    };

    _proto.getHelpTickets =
    /*#__PURE__*/
    function () {
      var _getHelpTickets = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.helpTickets.getHelpTickets(this.userObj);

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getHelpTickets() {
        return _getHelpTickets.apply(this, arguments);
      }

      return getHelpTickets;
    }();

    _proto.delete =
    /*#__PURE__*/
    function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.helpTicket) {
                  _context3.next = 6;
                  break;
                }

                _context3.next = 3;
                return this.helpTickets.delete(this.helpTicket);

              case 3:
                _context3.next = 5;
                return this.getHelpTickets();

              case 5:
                this.back();

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _delete() {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }();

    _proto.back = function back() {
      this.showHelpTicketEditForm = false;
    };

    _proto.newHelpTicket = function newHelpTicket() {
      this.helpTicket = {
        title: "",
        personId: this.userObj._id,
        ownerId: "a1a1a1a1a1a1a1a1a1a1a1a1",
        status: 'new'
      };
      this.helpTicketContent = {
        personId: this.userObj._id,
        content: ""
      };
      this.showEditForm();
    };

    _proto.editHelpTicket =
    /*#__PURE__*/
    function () {
      var _editHelpTicket = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(helpTicket) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.helpTicket = helpTicket;
                this.helpTicketContent = {
                  personId: this.userObj._id,
                  content: ""
                };
                _context4.next = 4;
                return this.helpTickets.getHelpTicketsContents(helpTicket._id);

              case 4:
                this.showEditForm();

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function editHelpTicket(_x) {
        return _editHelpTicket.apply(this, arguments);
      }

      return editHelpTicket;
    }();

    _proto.save =
    /*#__PURE__*/
    function () {
      var _save = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        var helpTicket;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(this.helpTicket && this.helpTicket.title && this.helpTicketContent && this.helpTicketContent.content)) {
                  _context5.next = 8;
                  break;
                }

                if (this.userObj.role !== 'user') {
                  this.helpTicket.ownerId = this.userObj._id;
                }

                helpTicket = {
                  helpTicket: this.helpTicket,
                  content: this.helpTicketContent
                };
                _context5.next = 5;
                return this.helpTickets.saveHelpTicket(helpTicket);

              case 5:
                _context5.next = 7;
                return this.getHelpTickets();

              case 7:
                this.back();

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function save() {
        return _save.apply(this, arguments);
      }

      return save;
    }();

    return HelpTickets;
  }()) || _class);
  _exports.HelpTickets = HelpTickets;
});
define('text!modules/helpTickets.html',[],function(){return "<template>\r\n\r\n        <h1>${message}</h1>\r\n        <compose show.bind=\"showHelpTicketEditForm\" view=\"./components/editHelpTicket.html\"> </compose>\r\n        <compose show.bind=\"!showHelpTicketEditForm\" view=\"./components/tableHelpTickets.html\"> </compose>\r\n</template>";});
define('modules/home',["exports", "aurelia-framework"], function (_exports, _aureliaFramework) {
  "use strict";

  _exports.__esModule = true;
  _exports.Home = void 0;

  var Home = function Home() {
    this.message = "Home";
  };

  _exports.Home = Home;
});
define('text!modules/home.html',[],function(){return "<template>\r\n    <h1>${message}</h1>\r\n</template>";});
define('modules/landing',["exports", "aurelia-framework", "aurelia-router"], function (_exports, _aureliaFramework, _aureliaRouter) {
  "use strict";

  _exports.__esModule = true;
  _exports.Landing = void 0;

  var _dec, _class;

  var Landing = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = function Landing() {
    this.message = "Landing";
  }) || _class);
  _exports.Landing = Landing;
});
define('text!modules/landing.html',[],function(){return "<template>\r\n    ${message}\r\n</template>";});
define('modules/users',["exports", "aurelia-framework", "aurelia-router", "../resources/data/user-object"], function (_exports, _aureliaFramework, _aureliaRouter, _userObject) {
  "use strict";

  _exports.__esModule = true;
  _exports.Users = void 0;

  var _dec, _class;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var Users = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _userObject.User), _dec(_class =
  /*#__PURE__*/
  function () {
    function Users(router, users) {
      this.router = router;
      this.users = users;
      this.message = 'Users';
      this.showUserEditForm = false;
    }

    var _proto = Users.prototype;

    _proto.activate =
    /*#__PURE__*/
    function () {
      var _activate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.getUsers();

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function activate() {
        return _activate.apply(this, arguments);
      }

      return activate;
    }();

    _proto.attached = function attached() {
      feather.replace();
    };

    _proto.getUsers =
    /*#__PURE__*/
    function () {
      var _getUsers = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.users.getUsers();

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getUsers() {
        return _getUsers.apply(this, arguments);
      }

      return getUsers;
    }();

    _proto.newUser = function newUser() {
      this.user = {
        firstName: "",
        lastName: "",
        active: true,
        role: "user",
        email: "",
        password: ""
      };
      this.openEditForm();
    };

    _proto.editUser = function editUser(user) {
      this.user = user;
      this.showUserEditForm = true;
    };

    _proto.openEditForm = function openEditForm() {
      this.showUserEditForm = true;
      setTimeout(function () {
        $("#firstName").focus();
      }, 500);
    };

    _proto.changeActive = function changeActive(user) {
      this.user = user;
      this.save();
    };

    _proto.save =
    /*#__PURE__*/
    function () {
      var _save = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.user && this.user.firstName && this.user.lastName && this.user.email && this.user.password)) {
                  _context3.next = 6;
                  break;
                }

                _context3.next = 3;
                return this.users.saveUser(this.user);

              case 3:
                _context3.next = 5;
                return this.getUsers();

              case 5:
                this.back();

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function save() {
        return _save.apply(this, arguments);
      }

      return save;
    }();

    _proto.delete =
    /*#__PURE__*/
    function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!this.user) {
                  _context4.next = 6;
                  break;
                }

                _context4.next = 3;
                return this.users.delete(this.user);

              case 3:
                _context4.next = 5;
                return this.getUsers();

              case 5:
                this.back();

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _delete() {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }();

    _proto.back = function back() {
      this.showUserEditForm = false;
    };

    _proto.logout = function logout() {
      this.router.navigate('home');
    };

    return Users;
  }()) || _class);
  _exports.Users = Users;
});
define('text!modules/users.html',[],function(){return "<template>\r\n        <h1>${message}</h1>\r\n        <compose show.bind=\"showUserEditForm\" view=\"./components/editUsers.html\"> </compose>\r\n        <compose show.bind=\"!showUserEditForm\" view=\"./components/tableUsers.html\"> </compose>\r\n    </template>";});
define('resources/data/data-services',["exports", "aurelia-framework", "aurelia-fetch-client"], function (_exports, _aureliaFramework, _aureliaFetchClient) {
  "use strict";

  _exports.__esModule = true;
  _exports.DataServices = void 0;

  var _dec, _class;

  var DataServices = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class =
  /*#__PURE__*/
  function () {
    function DataServices(http) {
      var _this = this;

      this.httpClient = http;
      this.BASE_URL = "http://localhost:5000/api/";
      this.httpClient.configure(function (config) {
        config.withBaseUrl(_this.BASE_URL).withDefaults({
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        }).withInterceptor({
          request: function request(_request) {
            var authHeader = 'Bearer ' + localStorage.getItem('aurelia_token');

            _request.headers.append('Authorization', authHeader);

            console.log("Requesting " + _request.method + " " + _request.url);
            return _request;
          },
          response: function response(_response) {
            console.log("Received " + _response.status + " " + _response.url);
            return _response;
          }
        });
      });
    }

    var _proto = DataServices.prototype;

    _proto.get = function get(url) {
      return this.httpClient.fetch(url).then(function (response) {
        return response.json();
      }).then(function (data) {
        return data;
      }).catch(function (error) {
        return error;
      });
    };

    _proto.post = function post(content, url) {
      return this.httpClient.fetch(url, {
        method: 'post',
        body: (0, _aureliaFetchClient.json)(content)
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    _proto.put = function put(content, url) {
      return this.httpClient.fetch(url, {
        method: 'put',
        body: (0, _aureliaFetchClient.json)(content)
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    _proto.delete = function _delete(url) {
      return this.httpClient.fetch(url, {
        method: 'delete'
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    _proto.uploadFiles = function uploadFiles(files, url) {
      var formData = new FormData();
      files.forEach(function (item, index) {
        formData.append("file" + index, item);
      });
      return this.httpClient.fetch(url, {
        method: 'post',
        body: formData
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    return DataServices;
  }()) || _class);
  _exports.DataServices = DataServices;
});
define('resources/data/help-ticket-object',["exports", "aurelia-framework", "./data-services"], function (_exports, _aureliaFramework, _dataServices) {
  "use strict";

  _exports.__esModule = true;
  _exports.HelpTicket = void 0;

  var _dec, _class;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var HelpTicket = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class =
  /*#__PURE__*/
  function () {
    function HelpTicket(data) {
      this.data = data;
      this.HELP_TICKET_SERVICE = 'helpTickets';
      this.HELPTICKETCONTENT_SERVICE = 'helpTicketContents';
    }

    var _proto = HelpTicket.prototype;

    _proto.getHelpTickets =
    /*#__PURE__*/
    function () {
      var _getHelpTickets = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(userObj) {
        var url, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                url = this.HELP_TICKET_SERVICE;

                if (userObj.role == 'user') {
                  url += '/user/' + userObj._id;
                }

                _context.next = 4;
                return this.data.get(url);

              case 4:
                response = _context.sent;

                if (!response.error) {
                  this.helpTicketsArray = response;
                } else {
                  this.helpTicketsArray = [];
                }

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getHelpTickets(_x) {
        return _getHelpTickets.apply(this, arguments);
      }

      return getHelpTickets;
    }();

    _proto.getHelpTicketsContents =
    /*#__PURE__*/
    function () {
      var _getHelpTicketsContents = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(userObj) {
        var url, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                url = this.HELP_TICKET_SERVICE;

                if (userObj.role == 'user') {
                  url += '/user/' + userObj._id;
                }

                _context2.next = 4;
                return this.data.get(url);

              case 4:
                response = _context2.sent;

                if (!response.error) {
                  this.helpTicketsArray = response;
                } else {
                  this.helpTicketsArray = [];
                }

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getHelpTicketsContents(_x2) {
        return _getHelpTicketsContents.apply(this, arguments);
      }

      return getHelpTicketsContents;
    }();

    _proto.saveHelpTicket =
    /*#__PURE__*/
    function () {
      var _saveHelpTicket = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(helpTicket) {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!helpTicket) {
                  _context3.next = 11;
                  break;
                }

                if (!helpTicket.helpTicket._id) {
                  _context3.next = 7;
                  break;
                }

                _context3.next = 4;
                return this.data.put(helpTicket, this.HELP_TICKET_SERVICE);

              case 4:
                serverResponse = _context3.sent;
                _context3.next = 10;
                break;

              case 7:
                _context3.next = 9;
                return this.data.post(helpTicket, this.HELP_TICKET_SERVICE);

              case 9:
                serverResponse = _context3.sent;

              case 10:
                return _context3.abrupt("return", serverResponse);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function saveHelpTicket(_x3) {
        return _saveHelpTicket.apply(this, arguments);
      }

      return saveHelpTicket;
    }();

    _proto.uploadFile =
    /*#__PURE__*/
    function () {
      var _uploadFile = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(files, id) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.data.uploadFiles(files, this.HELP_TICKET_CONTENT_SERVICE + "/upload/" + id);

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function uploadFile(_x4, _x5) {
        return _uploadFile.apply(this, arguments);
      }

      return uploadFile;
    }();

    _proto.delete =
    /*#__PURE__*/
    function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(helpTicket) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(helpTicket && helpTicket._id)) {
                  _context5.next = 3;
                  break;
                }

                _context5.next = 3;
                return this.data.delete(this.HELP_TICKET_SERVICE + '/' + helpTicket._id);

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _delete(_x6) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }();

    return HelpTicket;
  }()) || _class);
  _exports.HelpTicket = HelpTicket;
});
define('resources/data/user-object',["exports", "aurelia-framework", "./data-services"], function (_exports, _aureliaFramework, _dataServices) {
  "use strict";

  _exports.__esModule = true;
  _exports.User = void 0;

  var _dec, _class;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var User = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class =
  /*#__PURE__*/
  function () {
    function User(data) {
      this.data = data;
      this.USER_SERVICE = 'users';
    }

    var _proto = User.prototype;

    _proto.saveUser =
    /*#__PURE__*/
    function () {
      var _saveUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(user) {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!user) {
                  _context.next = 11;
                  break;
                }

                if (!user._id) {
                  _context.next = 7;
                  break;
                }

                _context.next = 4;
                return this.data.put(user, this.USER_SERVICE);

              case 4:
                serverResponse = _context.sent;
                _context.next = 10;
                break;

              case 7:
                _context.next = 9;
                return this.data.post(user, this.USER_SERVICE);

              case 9:
                serverResponse = _context.sent;

              case 10:
                return _context.abrupt("return", serverResponse);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function saveUser(_x) {
        return _saveUser.apply(this, arguments);
      }

      return saveUser;
    }();

    _proto.delete =
    /*#__PURE__*/
    function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(user) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(user && user._id)) {
                  _context2.next = 3;
                  break;
                }

                _context2.next = 3;
                return this.data.delete(this.USER_SERVICE + '/' + user._id);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _delete(_x2) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }();

    _proto.getUsers =
    /*#__PURE__*/
    function () {
      var _getUsers = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.data.get(this.USER_SERVICE);

              case 2:
                response = _context3.sent;

                if (!response.error) {
                  this.usersArray = response;
                } else {
                  this.usersArray = [];
                }

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getUsers() {
        return _getUsers.apply(this, arguments);
      }

      return getUsers;
    }();

    return User;
  }()) || _class);
  _exports.User = User;
});
define('resources/elements/nav-bar',["exports", "aurelia-framework", "aurelia-router", "aurelia-auth"], function (_exports, _aureliaFramework, _aureliaRouter, _aureliaAuth) {
  "use strict";

  _exports.__esModule = true;
  _exports.NavBar = void 0;

  var _dec, _class;

  var NavBar = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _aureliaAuth.AuthService), _dec(_class =
  /*#__PURE__*/
  function () {
    function NavBar(router, auth) {
      this.authenticated = false;
      this.auth = auth;
      this.router = router;
    }

    var _proto = NavBar.prototype;

    _proto.bind = function bind() {
      this.isAuthenticated = this.auth.isAuthenticated();
    };

    _proto.attached = function attached() {
      $('.navbar-nav a').on('click', function () {
        $('.navbar-nav').find('li.active').removeClass('active');
        $(this).parent('li').addClass('active');
      });
    };

    _proto.login = function login() {
      var _this = this;

      return this.auth.login(this.email, this.password).then(function (response) {
        _this.userObj = response.user;
        sessionStorage.setItem("userObj", JSON.stringify(_this.userObj));
        _this.loginError = "";
        _this.isAuthenticated = _this.auth.isAuthenticated();

        _this.router.navigate('home');
      }).catch(function (error) {
        console.log(error);
        _this.authenticated = false;
        _this.loginError = "Invalid credentials.";
      });
    };

    _proto.logout = function logout() {
      if (this.userObj) this.auth.logout(this.userObj.email);
      sessionStorage.removeItem('user');
      this.isAuthenticated = this.auth.isAuthenticated();
      this.auth.logout();
    };

    return NavBar;
  }()) || _class);
  _exports.NavBar = NavBar;
});
define('text!resources/elements/nav-bar.html',[],function(){return "<template>\r\n        <nav class=\"navbar navbar-expand-lg navbar-light bg-light\">\r\n            <a class=\"navbar-brand\" href=\"#\">Help Me!</a>\r\n            <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarNav\" aria-controls=\"navbarNav\"\r\n                aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n                <span class=\"navbar-toggler-icon\"></span>\r\n            </button>\r\n            <div class=\"collapse navbar-collapse\" id=\"navbarNav\">\r\n    \r\n                <form show.bind=\"!isAuthenticated\" class=\"form-inline\">\r\n                    <div class=\"form-group mb-2\">\r\n                        <label for=\"staticEmail2\" class=\"sr-only\">Email</label>\r\n                        <input type=\"text\" class=\"form-control\" id=\"staticEmail2\" value.bind=\"email\" placeholder=\"Email\">\r\n                    </div>\r\n                    <div class=\"form-group mx-sm-3 mb-2\">\r\n                        <label for=\"inputPassword2\" class=\"sr-only\">Password</label>\r\n                        <input type=\"password\" class=\"form-control\" id=\"inputPassword2\" value.bind=\"password\" placeholder=\"Password\">\r\n                    </div>\r\n                    <button click.trigger=\"login()\" class=\"btn btn-primary mb-2\">Login</button>\r\n                </form>\r\n    \r\n                <ul show.bind=\"isAuthenticated\" class=\"navbar-nav\">\r\n                    <li class=\"nav-item active\">\r\n                        <a class=\"nav-link\" href=\"#\">Home <span class=\"sr-only\">(current)</span></a>\r\n                    </li>\r\n                    <li class=\"nav-item\">\r\n                        <a class=\"nav-link\" href=\"#users\">Users</a>\r\n                    </li>\r\n                    <li class=\"nav-item\">\r\n                        <a class=\"nav-link\" href=\"#helpTickets\">Help Ticket</a>\r\n                    </li>\r\n                    <li class=\"nav-item\">\r\n                        <a class=\"nav-link disabled\" href=\"#\" click.trigger=\"logout()\">Logout</a>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </nav>\r\n    </template>";});
define('resources/index',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.configure = configure;

  function configure(config) {
    config.globalResources(['./elements/nav-bar']);
  }
});
define('resources/value-converters/format-date',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.FormatDateValueConverter = void 0;

  var FormatDateValueConverter =
  /*#__PURE__*/
  function () {
    function FormatDateValueConverter() {}

    var _proto = FormatDateValueConverter.prototype;

    _proto.toView = function toView(value) {
      var myDate = new Date(value);
      return myDate.toLocaleDateString() + "<br/>" + myDate.toLocaleTimeString();
    };

    return FormatDateValueConverter;
  }();

  _exports.FormatDateValueConverter = FormatDateValueConverter;
});
define('resources',['resources/index'],function(m){return m;});
//# sourceMappingURL=app-bundle.js.map