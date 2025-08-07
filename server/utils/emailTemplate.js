export const welcomeTemplateText = "Hey {name}, \n\nWelcome to HIVnext! Use the following OTP to complete the procedure to verify you email here. Your OTP is valid for 15 minutes. {otp} \n\nNeed help? Ask at admin@codebitestudios.codes (mailto:admin@codebitestudios.codes)\n\nCodebite Studios\n\nAddress here\n\nCopyright © {year} Codebite Studios. All rights reserved."

export const changePasswordTemplateText = "Hey {name},\n\nBelow is your link requested to change your HIVnext password: {resetlink}. This link is valid for 15 minutes. Please do not share this link to anyone. Ignore this email if you did not request to change password.\n\nNeed help? Ask at admin@codebitestudios.codes (mailto:admin@codebitestudios.codes)\n\nCodebite Studios\n\nAddress here\n\nCopyright © {year} Codebite Studios. All rights reserved."

export const welcomeTemplateHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Welcome</title>

    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body
    style="
      margin: 0;
      font-family: 'Poppins', sans-serif;
      background: #ffffff;
      font-size: 14px;
    "
  >
    <div
      style="
        max-width: 680px;
        margin: 0 auto;
        padding: 45px 30px 60px;
        background: #f4f7ff;
        background-image: url(https://i.ibb.co/7xyQ5vkh/emailbackground.jpg);
        background-repeat: no-repeat;
        background-size: 800px 452px;
        background-position: top center;
        font-size: 14px;
        color: #434343;
      "
    >
      <header>
        <div style="display: flex; justify-content: center">
          <img
            alt=""
            src="https://olive-odella-90.tiiny.site/HIVnext.svg"
            height="40px"
          />
        </div>
      </header>

      <main>
        <div
          style="
            margin: 0;
            margin-top: 70px;
            padding: 92px 30px 115px;
            background: #ffffff;
            border-radius: 30px;
            text-align: center;
          "
        >
          <div style="width: 100%; max-width: 489px; margin: 0 auto">
            <h1
              style="
                margin: 0;
                font-size: 24px;
                font-weight: 500;
                color: #1f1f1f;
              "
            >
              Your OTP
            </h1>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-size: 16px;
                font-weight: 500;
              "
            >
              Hey {name},
            </p>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-weight: 500;
                letter-spacing: 0.56px;
              "
            >
              Welcome to HIVnext! Use the following OTP to complete the
              procedure to verify you email
              <a href="#" style="color: #499fb6; text-decoration: none">here</a
              >. Your OTP is valid for
              <span style="font-weight: 600; color: #1f1f1f">15 minutes</span>.
            </p>
            <p
              style="
                margin: 0;
                margin-top: 60px;
                font-size: 40px;
                font-weight: 600;
                letter-spacing: 25px;
                color: #ba3d4f;
              "
            >
              {otp}
            </p>
          </div>
        </div>

        <p
          style="
            max-width: 400px;
            margin: 0 auto;
            margin-top: 90px;
            text-align: center;
            font-weight: 500;
            color: #8c8c8c;
          "
        >
          Need help? Ask at
          <a
            href="mailto:admin@codebitestudios.codes"
            style="color: #499fb6; text-decoration: none"
            >admin@codebitestudios.codes</a
          >
        </p>
      </main>

      <footer
        style="
          width: 100%;
          max-width: 490px;
          margin: 20px auto 0;
          text-align: center;
          border-top: 1px solid #e6ebf1;
        "
      >
        <p
          style="
            margin: 0;
            margin-top: 40px;
            font-size: 16px;
            font-weight: 600;
            color: #434343;
          "
        >
          Codebite Studios
        </p>
        <p style="margin: 0; margin-top: 8px; color: #434343">Address here</p>
        <div style="margin: 0; margin-top: 16px">
          <a href="" target="_blank" style="display: inline-block">
            <img
              width="36px"
              alt="Facebook"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook"
            />
          </a>
          <a
            href=""
            target="_blank"
            style="display: inline-block; margin-left: 8px"
          >
            <img
              width="36px"
              alt="Instagram"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram"
          /></a>
          <a
            href=""
            target="_blank"
            style="display: inline-block; margin-left: 8px"
          >
            <img
              width="36px"
              alt="Twitter"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter"
            />
          </a>
        </div>
        <p style="margin: 0; margin-top: 16px; color: #434343">
          Copyright © {year} Codebite Studios. All rights reserved.
        </p>
      </footer>
    </div>
  </body>
</html>`

export const changePasswordTemplateHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Reset Your Password</title>

    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body
    style="
      margin: 0;
      font-family: 'Poppins', sans-serif;
      background: #ffffff;
      font-size: 14px;
    "
  >
    <div
      style="
        max-width: 680px;
        margin: 0 auto;
        padding: 45px 30px 60px;
        background: #f4f7ff;
        background-image: url(https://i.ibb.co/7xyQ5vkh/emailbackground.jpg);
        background-repeat: no-repeat;
        background-size: 800px 452px;
        background-position: top center;
        font-size: 14px;
        color: #434343;
      "
    >
      <header>
        <div style="display: flex; justify-content: center">
          <img
            alt=""
            src="https://olive-odella-90.tiiny.site/HIVnext.svg"
            height="40px"
          />
        </div>
      </header>

      <main>
        <div
          style="
            margin: 0;
            margin-top: 70px;
            padding: 92px 30px 115px;
            background: #ffffff;
            border-radius: 30px;
            text-align: center;
          "
        >
          <div style="width: 100%; max-width: 489px; margin: 0 auto">
            <h1
              style="
                margin: 0;
                font-size: 24px;
                font-weight: 500;
                color: #1f1f1f;
              "
            >
              Change Password OTP
            </h1>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-size: 16px;
                font-weight: 500;
              "
            >
              Hey {name},
            </p>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-weight: 500;
                letter-spacing: 0.56px;
              "
            >
              Below is your link requested to change your HIVnext password: <br><a href="{resetlink}" styles="text-decoration:none;">{resetlink}</a><br>Your link is valid for
              <span style="font-weight: 600; color: #1f1f1f">15 minutes</span>.
              Please do not share your link to anyone. Ignore this email if you
              did not request to change password.
            </p>
          </div>
        </div>

        <p
          style="
            max-width: 400px;
            margin: 0 auto;
            margin-top: 90px;
            text-align: center;
            font-weight: 500;
            color: #8c8c8c;
          "
        >
          Need help? Ask at
          <a
            href="mailto:admin@codebitestudios.codes"
            style="color: #499fb6; text-decoration: none"
            >admin@codebitestudios.codes</a
          >
        </p>
      </main>

      <footer
        style="
          width: 100%;
          max-width: 490px;
          margin: 20px auto 0;
          text-align: center;
          border-top: 1px solid #e6ebf1;
        "
      >
        <p
          style="
            margin: 0;
            margin-top: 40px;
            font-size: 16px;
            font-weight: 600;
            color: #434343;
          "
        >
          Codebite Studios
        </p>
        <p style="margin: 0; margin-top: 8px; color: #434343">Address here</p>
        <div style="margin: 0; margin-top: 16px">
          <a href="" target="_blank" style="display: inline-block">
            <img
              width="36px"
              alt="Facebook"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook"
            />
          </a>
          <a
            href=""
            target="_blank"
            style="display: inline-block; margin-left: 8px"
          >
            <img
              width="36px"
              alt="Instagram"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram"
          /></a>
          <a
            href=""
            target="_blank"
            style="display: inline-block; margin-left: 8px"
          >
            <img
              width="36px"
              alt="Twitter"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter"
            />
          </a>
        </div>
        <p style="margin: 0; margin-top: 16px; color: #434343">
          Copyright © {year} Codebite Studios. All rights reserved.
        </p>
      </footer>
    </div>
  </body>
</html>`