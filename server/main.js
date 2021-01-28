import "/imports/api/fixtures";
import "/imports/api/methods";
import "/imports/api/publications";

import "/imports/api/permissions/permissions";

import "/imports/api/users/server/users";
import "/imports/api/users/server/publications";
import "/imports/api/users/server/email-settings";


if (Meteor.settings.email?.mailUrl) {
  process.env.MAIL_URL = Meteor.settings.email.mailUrl;
}

if (Meteor.isDevelopment) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
}
