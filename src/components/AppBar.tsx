import { usePathname } from 'next/navigation';
import MenuIconItem from '@/components/MenuIconItem';
import MenuItem from '@/components/MenuItem';
import Pane from '@/components/Pane';
import { useProfile } from '@/providers/ProfileProvider';

export default function AppBar({ className }: { className?: string }) {
  const pathname = usePathname();
  const profile = useProfile();

  return profile ? (
    <Pane className={className}>
      <div className="flex flex-nowrap justify-between">
        <nav className="flex h-14 text-sm font-semibold uppercase">
          <MenuItem href="/" home aria-label="Home">
            <i className="icofont icofont-home text-white text-2xl"></i>
          </MenuItem>
          <MenuItem
            href="/experience"
            active={pathname === '/experience'}
            aria-label="Experience"
          >
            Experience
          </MenuItem>
          <MenuItem
            href="/sideprojects"
            active={pathname === '/sideprojects'}
            aria-label="Side Projects"
          >
            Side Projects
          </MenuItem>
          <MenuItem
            href="/contact"
            active={pathname === '/contact'}
            aria-label="Contact"
          >
            Contact
          </MenuItem>
        </nav>
        <div className="flex space-x-4 justify-center items-center px-4">
          {profile.linkedInUrl ? (
            <MenuIconItem href={profile.linkedInUrl} aria-label="Linkedin">
              <i className="icofont icofont-linkedin"></i>
            </MenuIconItem>
          ) : null}
          {profile.githubUrl ? (
            <MenuIconItem href={profile.githubUrl} aria-label="Github">
              <i className="icofont icofont-github"></i>
            </MenuIconItem>
          ) : null}
          {profile.twitterUrl ? (
            <MenuIconItem href={profile.twitterUrl} aria-label="X ex Twitter">
              <i className="icofont icofont-twitter"></i>
            </MenuIconItem>
          ) : null}
        </div>
      </div>
    </Pane>
  ) : null;
}
