import Link from "next/link";

const navigation = {
  main: [
    { name: "Features", href: "#features" },
    { name: "How it works", href: "#how-it-works" },
    { name: "FAQ", href: "#faq" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
  social: [
    {
      name: "Twitter",
      href: "#",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
  ],
};

export function Footer() {
  return (
    <footer className="bg-darkblue border-t border-white/10">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 lg:px-8">
        <nav
          className="-mb-4 columns-2 sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-4">
              <Link
                href={item.href}
                className="text-sm leading-6 text-white/80 hover:text-brand-500 transition-colors font-body font-light"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <div className="mt-8 flex justify-center space-x-10">
          {navigation.social.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-white/60 hover:text-brand-500 transition-colors"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </Link>
          ))}
        </div>
        <p className="mt-8 text-center text-sm leading-5 text-white/60 font-body font-light">
          Built with <span className="text-red-500">❤️</span> by <span className="text-brand-500 font-medium">Surfing Digital</span> · Ride the AI Wave — from Idea to ROI.
        </p>
        <p className="mt-2 text-center text-xs leading-5 text-white/40 font-body font-light">
          &copy; {new Date().getFullYear()} Surfing Digital. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
