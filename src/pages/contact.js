import { useCallback, useRef, useState } from 'react';

import axios from 'axios';
import CAPTCHA from 'react-google-recaptcha';
import getConfig from 'next/config';
import IconButton from '../components/IconButton';
import Pane from '../components/Pane';
import Title from '../components/Title';
import { useComponentMounted } from '../components/hooks';

const {
  publicRuntimeConfig: { RECAPTCHA_SITE_KEY, CONTACT_FORM_ENDPOINT },
} = getConfig();

function Input({ id, type, title, required }) {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="block mb-2 text-sm text-gray-600">
        {title}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        required={!!required}
        className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
      />
    </div>
  );
}

function Textarea({ id, title, required }) {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="block mb-2 text-sm text-gray-600">
        {title}
      </label>

      <textarea
        rows="5"
        name={id}
        className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
        required={!!required}
      ></textarea>
    </div>
  );
}

const mailRegExp =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function ContactForm() {
  const formRef = useRef();
  const [token, setToken] = useState();
  const [sending, setSending] = useState(false);
  const [formStatus, setFormStatus] = useState({ text: '', isError: false });
  const isMountedRef = useComponentMounted();

  const onCaptchaUpdated = useCallback((token) => {
    setToken(token);
  }, []);

  const onCaptchaFailed = useCallback(() => {
    setToken();
  }, []);

  const onClick = useCallback(
    async (e) => {
      try {
        e.preventDefault();

        const formData = new FormData(formRef.current);

        const data = {
          subject: 'Someone has seen your profile and wants to contact you',
          token,
        };
        formData.forEach((value, key) => {
          data[key] = value?.trim();
        });

        if (!token) {
          setFormStatus({
            text: 'Please confirm you are not robot.',
            isError: true,
          });
        } else if (!data?.name || !data?.email || !data.message) {
          setFormStatus({
            text: 'All fields are required to send a message.',
            isError: true,
          });
        } else if (!mailRegExp.test(data.email)) {
          setFormStatus({
            text: 'Enter a valid email address.',
            isError: true,
          });
        } else {
          setSending(true);
          const response = await axios.post(
            CONTACT_FORM_ENDPOINT,
            { ...data },
            {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            }
          );

          if (response.status === 200) {
            formRef.current.reset();
            setFormStatus({ text: response.data.message, isError: false });
          } else {
            setFormStatus({ text: response.data.message, isError: true });
          }
        }
      } catch (error) {
        setFormStatus({
          text: error?.response?.data?.message || 'Something went wrong!',
          isError: true,
        });
        console.error(error);
      } finally {
        setSending(false);
        setTimeout(() => {
          if (isMountedRef.current) {
            setFormStatus({ text: '', isError: false });
          }
        }, 7000);
      }
    },
    [isMountedRef, token]
  );

  return (
    <form ref={formRef} id="form">
      <div className="py-2 h-11">
        {formStatus?.text ? (
          <p
            className={`text-lg font-medium ${
              formStatus.isError ? 'text-red-400' : 'text-green-500 '
            }`}
          >
            {formStatus.text}
          </p>
        ) : null}
      </div>
      <Input type="text" id="name" title="Name" />
      <Input type="text" id="email" title="E-mail" />
      <Textarea id="message" title="Message" />
      <div className="flex justify-center items-center my-4">
        <CAPTCHA
          sitekey={RECAPTCHA_SITE_KEY}
          hl="en"
          onChange={onCaptchaUpdated}
          onErrored={onCaptchaFailed}
          onExpired={onCaptchaFailed}
        />
      </div>
      <div className="flex justify-center items-center mb-4">
        <IconButton
          title={!sending ? 'Send' : 'Sending'}
          icon={
            !sending
              ? 'icofont-paper-plane'
              : 'animate-spin icofont-spinner-alt-2'
          }
          type="submit"
          disabled={sending}
          onClick={onClick}
        />
      </div>
    </form>
  );
}

export default function Contact() {
  return (
    <Pane className="py-10">
      <section className="pb-4 px-10 max-md:px-4">
        <Title>Contact</Title>
        <ContactForm />
      </section>
    </Pane>
  );
}
