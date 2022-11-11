import Link from 'next/link';
import Pane from './Pane';
import ProfileContext from './ProfileContext';
import { useContext } from 'react';
import { useRouter } from 'next/router';

function MenuItem({ href, home = false, active = false, children }) {
  return (
    <Link href={href}>
      {home ? (
        <a className="flex rounded-l-md justify-center items-center bg-accent transition ease-in delay-150 hover:bg-accent-light w-16">
          {children}
        </a>
      ) : (
        <a
          className={`px-3 flex justify-center items-center transition ease-in delay-150 hover:text-accent-light ${
            active ? 'text-accent' : ''
          }`}
        >
          {children}
        </a>
      )}
    </Link>
  );
}

function MenuIconItem({ href, children }) {
  return (
    <a href={href} className="transition ease-in delay-150 hover:text-accent">
      {children}
    </a>
  );
}

export default function AppBar() {
  const router = useRouter();
  const profile = useContext(ProfileContext);

  return (
    <Pane>
      <div className="flex flex-nowrap justify-between">
        <nav className="flex h-14 text-sm font-medium uppercase">
          <MenuItem href="/" home>
            <i className="icofont icofont-home text-white text-2xl"></i>
          </MenuItem>
          <MenuItem
            href="/experience"
            active={router.pathname === '/experience'}
          >
            Experience
          </MenuItem>
          <MenuItem
            href="/sideprojects"
            active={router.pathname === '/sideprojects'}
          >
            Side Projects
          </MenuItem>
          <MenuItem href="/contact" active={router.pathname === '/contact'}>
            Contact
          </MenuItem>
        </nav>
        <div className="flex space-x-4 justify-center items-center px-4">
          <MenuIconItem href={profile.linkedInUrl}>
            <i className="icofont icofont-linkedin"></i>
          </MenuIconItem>
          <MenuIconItem href={profile.githubUrl}>
            <i className="icofont icofont-github"></i>
          </MenuIconItem>
          <MenuIconItem href={profile.twitterUrl}>
            <i className="icofont icofont-twitter"></i>
          </MenuIconItem>
        </div>
      </div>
    </Pane>
  );
}
