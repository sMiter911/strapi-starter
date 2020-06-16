module.exports = ({env}) => ({
  send: async (ctx) => {
    let options = ctx.request.body;
    try {
      const sgMail = require("@sendgrid/mail");
      sgMail.setApiKey(env(SENDGRID_API_KEY));
      const msg = {
        to: options.to,
        from: options.from,
        subject: options.subject,
        text: options.text,
        html: options.html,
      };
      sgMail.send(msg);
    } catch (e) {
      if (e.statusCode === 400) {
        return ctx.badRequest(e.message);
      } else {
        throw new Error(`Couldn't send email: ${e.message}.`);
      }
    }
    // Send 200 `ok`
    ctx.send({});
  },
});
