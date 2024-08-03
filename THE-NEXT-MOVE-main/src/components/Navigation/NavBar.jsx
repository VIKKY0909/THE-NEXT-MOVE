import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png'; // Ensure this path is correct

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'FAQ', href: '/faq', current: false },
  { name: 'Order Now', href: '/order-now', current: false },
  { name: 'Product Catalog', href: '/product-catalog', current: false },
  { name: 'Blog', href: '/blog', current: false },
  { name: 'Contact Us', href: '/contact-us', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NavBar() {
  return (
    <Disclosure as="nav" className="bg-[#E9ECEF] sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto  px-4  lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                <div className="flex flex-shrink-0 items-center">
                  <NavLink to="/">
                    <img className="h-12 w-auto" src={logo} alt="Logo" />
                  </NavLink>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                          classNames(
                            isActive
                              ? 'font-extrabold text-black-500'
                              : item.name === 'Contact Us'
                              ? 'text-white hover:text-cyan-200 bg-[#312E81]'
                              : 'text-gray-700 hover:text-black hover:font-extrabold',
                            'rounded-md px-3 py-2 text-lg font-medium'
                          )
                        }
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 flex flex-col">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={NavLink}
                  to={item.href}
                  className={({ isActive }) =>
                    classNames(
                      isActive
                        ? 'font-bold text-blue-500'
                        : item.name === 'Contact Us'
                        ? 'text-white hover:text-blue-500 bg-[#312E81]'
                        : 'text-gray-700 hover:text-blue-500',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )
                  }
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
