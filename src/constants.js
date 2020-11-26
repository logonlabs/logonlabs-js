const providers = {
    APPLE: 'apple',
    BASECAMP: 'basecamp',
    DROPBOX: 'dropbox',
    FACEBOOK: 'facebook',
    FITBIT: 'fitbit',
    GITHUB: 'github',
    GOOGLE: 'google',
    LINKEDIN: 'linkedin',
    MICROSOFT: 'microsoft',
    OKTA: 'okta',
    ONELOGIN: 'onelogin',
    PLANNINGCENTER: 'planningcenter',
    QUICKBOOKS: 'quickbooks',
    SLACK: 'slack',
    TWITCH: 'twitch',
    TWITTER: 'twitter',
    KEYKCLOAK: 'keycloak',
    SALESFORCE: 'salesforce',
    LOCAL: 'local',
};

const LOCAL = {
    type: providers.LOCAL,
    name: 'Local',
};

const APPLE = {
    type: providers.APPLE,
    name: 'Apple',
};
const BASECAMP = {
    type: providers.BASECAMP,
    name: 'Basecamp',
};
const DROPBOX = {
    type: providers.DROPBOX,
    name: 'Dropbox',
};
const FACEBOOK = {
    type: providers.FACEBOOK,
    name: 'Facebook',
};
const FITBIT = {
    type: providers.FITBIT,
    name: 'Fitbit',
};
const GITHUB = {
    type: providers.GITHUB,
    name: 'Github',
};
const GOOGLE = {
    type: providers.GOOGLE,
    name: 'Google',
};
const LINKEDIN = {
    type: providers.LINKEDIN,
    name: 'LinkedIn',
};
const MICROSOFT = {
    type: providers.MICROSOFT,
    name: 'Microsoft',
};
const OKTA = {
    type: providers.OKTA,
    name: 'Okta',
};
const ONELOGIN = {
    type: providers.ONELOGIN,
    name: 'onelogin',
};
const PLANNINGCENTER = {
    type: providers.PLANNINGCENTER,
    name: 'planning center',
};
const QUICKBOOKS = {
    type: providers.QUICKBOOKS,
    name: 'QuickBooks',
};
const SLACK = {
    type: providers.SLACK,
    name: 'Slack',
};
const TWITCH = {
    type: providers.TWITCH,
    name: 'Twitch',
};
const TWITTER = {
    type: providers.TWITTER,
    name: 'Twitter',
};
const KEYCLOAK = {
    type: providers.KEYCLOAK,
    name: 'Keycloak',
};
const SALESFORCE = {
    type: providers.SALESFORCE,
    name: 'SalesForce',
};

const providers_hash = {
    apple: APPLE,
    basecamp: BASECAMP,
    dropbox: DROPBOX,
    facebook: FACEBOOK,
    fitbit: FITBIT,
    github: GITHUB,
    google: GOOGLE,
    linkedin: LINKEDIN,
    microsoft: MICROSOFT,
    okta: OKTA,
    onelogin: ONELOGIN,
    planningcenter: PLANNINGCENTER,
    quickbooks: QUICKBOOKS,
    slack: SLACK,
    twitch: TWITCH,
    twitter: TWITTER,
    keycloak: KEYCLOAK,
    salesforce: SALESFORCE,
    local: LOCAL,
};

const providers_buttons = {
    APPLE: APPLE,
    BASECAMP: BASECAMP,
    DROPBOX: DROPBOX,
    FACEBOOK: FACEBOOK,
    FITBIT: FITBIT,
    GITHUB: GITHUB,
    GOOGLE: GOOGLE,
    LINKEDIN: LINKEDIN,
    MICROSOFT: MICROSOFT,
    OKTA: OKTA,
    ONELOGIN: ONELOGIN,
    PLANNINGCENTER: PLANNINGCENTER,
    QUICKBOOKS: QUICKBOOKS,
    SLACK: SLACK,
    TWITCH: TWITCH,
    TWITTER: TWITTER,
    KEYCLOAK: KEYCLOAK,
    SALESFORCE: SALESFORCE,
    LOCAL: LOCAL,
};

const providers_list = [];
for (let key in providers) {
    providers_list.push(providers[key]);
}

export default {
    providers,
    providers_buttons,
    providers_hash,
    providers_list,
};
