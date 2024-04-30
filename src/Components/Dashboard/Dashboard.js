import React, { useCallback, useState } from 'react';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import './styles.css'
import { Link, Outlet } from 'react-router-dom';
const Home = () => {
    const [visible, setVisible] = useState(true);
    const toggleVisible = useCallback(() => {
        setVisible(visible => !visible);
    }, []);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDropdownOpentask, setIsDropdownOpentask] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };
    const toggleDropdowntask = () => {
        setIsDropdownOpentask(!isDropdownOpentask);
    };
    const closeDropdowntask = () => {
        setIsDropdownOpentask(false);
    };

    const [user] = useAuthState(auth);
    const logout = () => {
        signOut(auth);
        toast.success("Logged out successfully")
    };
    return (
        <div>
            <div className="bg-gray-100 dark:bg-gray-900">
                {visible ? <aside
                    className="fixed top-0 z-10 flex h-screen flex-col justify-between border-r bg-white px-6 pb-3 duration-300 w-[35%] md:w-[30%] lg:w-[25%] xl:w-[20%] 2xl:w-[15%] dark:bg-gray-800 dark:border-gray-700 ease-in sidebar overflow-x-hidden"
                >
                    <div className=''>
                        <div className="-mx-6 px-6 py-4">
                            <a href="#" title="home">
                                <img src="images/logo.svg" className="w-32" alt="" />
                            </a>
                        </div>

                        <div className="mt-8 text-center">
                            <img
                                src={user?.photoURL}
                                alt=""
                                className="m-auto h-10 w-10 rounded-full object-cover"
                            />
                            <h5 className="mt-4 text-lg font-semibold text-gray-600 dark:text-gray-300">{user?.displayName}</h5>
                            <span className="hidden text-gray-400 lg:block">Admin</span>
                        </div>

                        <ul className="mt-8 space-y-2 tracking-wide">
                            <li>
                                <Link
                                    to={"/"}
                                    aria-label="dashboard"
                                    className="relative flex items-center space-x-4 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-400 px-2 py-1 md:px-4 md:py-3 text-white"
                                >
                                    <i className=" fas fa-th"></i>
                                    <span className="-mr-1 font-medium">Dashboard</span>
                                </Link>
                            </li>

                            <li>
                                <a href="#" className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 justify-normal dark:text-gray-300 active" id="profile">
                                    <i className=" fas fa-user-circle"></i>
                                    <p className='group-hover:text-gray-700 dark:group-hover:text-gray-50'>
                                        Profile
                                    </p>
                                </a>
                            </li>

                            <li>
                                <a href="#" className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 justify-normal dark:text-gray-300" id="groups">
                                    <i className=" fas fa-layer-group"></i>
                                    <p className='group-hover:text-gray-700 dark:group-hover:text-gray-50'>
                                        Invoices
                                    </p>
                                </a>
                            </li>

                            <li>
                                <a href="#" className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 justify-normal dark:text-gray-300" id="reports">
                                    <i className=" fas fa-flag"></i>
                                    <p className='group-hover:text-gray-700 dark:group-hover:text-gray-50'>
                                        Reports
                                    </p>
                                </a>
                            </li>

                            <li>
                                <a href="#" className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 justify-normal dark:text-gray-300" id="branches">
                                    <i className="fas fa-map-marked-alt "></i>
                                    <p className='group-hover:text-gray-700 dark:group-hover:text-gray-50'>Branches</p>
                                </a>
                            </li>

                            <li>
                                <a href="#" className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 justify-normal dark:text-gray-300" id="tests">
                                    <i className=" fas fa-flask"></i>
                                    <p className='group-hover:text-gray-700 dark:group-hover:text-gray-50'>
                                        Tests
                                    </p>
                                </a>
                            </li>
                            <li className="relative" id="tasks">
                                <span
                                    className="flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 justify-normal dark:text-gray-300 cursor-pointer"
                                    id="tasks"
                                    onClick={toggleDropdowntask}
                                >
                                    <i className="fa-regular fa-star"></i>
                                    <span className="flex items-center">
                                        <p>Tasks</p>
                                        <i
                                            className={`ml-2 right fas fa-angle-right transition-transform duration-200 ${isDropdownOpentask ? 'rotate-90' : ''
                                                }`}
                                        ></i>
                                    </span>
                                </span>
                            </li>
                            <ul
                                className={`relative z-10 bg-white duration-300 ease-in top-full left-0 w-48 ${isDropdownOpentask ? 'block' : 'hidden'
                                    }`}
                                id="dropdown-menu"
                            >
                                <li className="">
                                    <Link
                                        to={"create-form"}
                                        className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 justify-normal dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        id="tests_prices"
                                        onClick={closeDropdowntask}
                                    >
                                        <i className="far fa-circle"></i>
                                        <p>Create Form</p>
                                    </Link>
                                </li>
                                <li className="">
                                    <Link
                                        to={"update-form"}
                                        className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 justify-normal dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        id="tests_prices"
                                        onClick={closeDropdowntask}
                                    >
                                        <i className="far fa-circle"></i>
                                        <p>Update Form</p>
                                    </Link>
                                </li>
                                <li className="">
                                    <Link
                                        to={"table"}
                                        className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 justify-normal dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        id="cultures_prices"
                                        onClick={closeDropdowntask}
                                    >
                                        <i className="far fa-circle"></i>
                                        <p>Table</p>
                                    </Link>
                                </li>
                            </ul>
                            <li>
                                <a href="#" className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 justify-normal dark:text-gray-300" id="cultures">
                                    <i className=" fas fa-vial"></i>
                                    <p className='group-hover:text-gray-700 dark:group-hover:text-gray-50'>
                                        Cultures
                                    </p>
                                </a>
                            </li>

                            <li>
                                <a href="#" className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 justify-normal dark:text-gray-300" id="culture_options">
                                    <i className=" fas fa-vial"></i>
                                    <p className='group-hover:text-gray-700 dark:group-hover:text-gray-50'>
                                        Culture options
                                    </p>
                                </a>
                            </li>

                            <li>
                                <a href="#" className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 justify-normal dark:text-gray-300" id="antibiotics">
                                    <i className=" fas fa-capsules"></i>
                                    <p className='group-hover:text-gray-700 dark:group-hover:text-gray-50'>
                                        Antibiotics
                                    </p>
                                </a>
                            </li>

                            <li>
                                <a href="#" className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 justify-normal dark:text-gray-300" id="doctors">
                                    <i className=" fa fa-user-md"></i>
                                    <p className='group-hover:text-gray-700 dark:group-hover:text-gray-50'>
                                        Doctors
                                    </p>
                                </a>
                            </li>
                            <li className="relative" id="prices">
                                <a
                                    href="#"
                                    className="flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 justify-normal dark:text-gray-300"
                                    id="prices_link"
                                    onClick={toggleDropdown}
                                >
                                    <i className="fas fa-list"></i>
                                    <span className="flex items-center">
                                        <p>Price List</p>
                                        <i
                                            className={`ml-2 right fas fa-angle-right transition-transform duration-200 ${isDropdownOpen ? 'rotate-90' : ''
                                                }`}
                                        ></i>
                                    </span>
                                </a>
                            </li>
                            <ul
                                className={`relative z-10 bg-white duration-300 ease-in top-full left-0 w-48 ${isDropdownOpen ? 'block' : 'hidden'
                                    }`}
                                id="dropdown-menu"
                            >
                                <li className="">
                                    <a
                                        href="#"
                                        className="flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 justify-normal dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        id="tests_prices"
                                        onClick={closeDropdown}
                                    >
                                        <i className="far fa-circle"></i>
                                        <p>Tests</p>
                                    </a>
                                </li>
                                <li className="">
                                    <a
                                        href="#"
                                        className="flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 justify-normal dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        id="cultures_prices"
                                        onClick={closeDropdown}
                                    >
                                        <i className="far fa-circle"></i>
                                        <p>Cultures</p>
                                    </a>
                                </li>
                            </ul>
                        </ul>
                    </div>
                    {user ?
                        <div className="-mx-6 flex items-center justify-between border-t px-6 pt-4 dark:border-gray-700">
                            <button className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 dark:text-gray-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                                <span className="group-hover:text-gray-700 dark:group-hover:text-white" onClick={logout}>Logout</span>
                            </button>
                        </div> : <></>}
                </aside> : <aside
                    className="fixed top-0 z-10 flex h-screen flex-col justify-between border-r bg-white px-6 pb-3 duration-300 w-[15%] md:w-[10%] lg:w-[15%] xl:w-[10%] 2xl:w-[5%] dark:bg-gray-800 dark:border-gray-700 ease-in"
                >
                    <div>
                        <div className="-mx-6 px-6 py-4">
                            <a href="#" title="home">
                                <img src="images/logo.svg" className="w-32" alt="" />
                            </a>
                        </div>

                        <div className="mt-8">
                            <img
                                src={user?.photoURL}
                                alt=""
                                className="h-10 w-10 rounded-full object-cover"
                            />
                        </div>

                        <ul className="mt-8 space-y-2 tracking-wide">
                            <li>
                                <div className="tooltip tooltip-right" data-tip="Dashboard">
                                    <Link
                                        to={"/"}
                                        aria-label="dashboard"
                                        className="group flex items-center space-x-4 rounded-md px-3 py-2 text-gray-600 justify-normal dark:text-gray-300"
                                    >
                                        <i className=" fas fa-th"></i>
                                    </Link>
                                </div>
                            </li>

                            <li>
                                <div className="tooltip tooltip-right" data-tip="Profile">
                                    <a href="#" className="group flex items-center space-x-4 rounded-md px-3 py-2 text-gray-600 justify-normal dark:text-gray-300" id="profile">
                                        <i className=" fas fa-user-circle"></i>
                                    </a>
                                </div>
                            </li>

                            <li>
                                <div className="tooltip tooltip-right" data-tip="Invoices">
                                    <a href="#" className="group flex items-center space-x-4 rounded-md px-3 py-2 text-gray-600 justify-normal dark:text-gray-300" id="groups">
                                        <i className=" fas fa-layer-group"></i>
                                    </a>
                                </div>
                            </li>

                            <li>
                                <div className="tooltip tooltip-right" data-tip="Reports">
                                    <a href="#" className="group flex items-center space-x-4 rounded-md px-3 py-2 text-gray-600 justify-normal dark:text-gray-300" id="reports">
                                        <i className=" fas fa-flag"></i>
                                    </a>
                                </div>
                            </li>

                            <li>
                                <div className="tooltip tooltip-right" data-tip="Branches">
                                    <a href="#" className="group flex items-center space-x-4 rounded-md px-3 py-2 text-gray-600 justify-normal dark:text-gray-300" id="branches">
                                        <i className="fas fa-map-marked-alt "></i>
                                    </a>
                                </div>
                            </li>

                            <li>
                                <div className="tooltip tooltip-right" data-tip="Tests">
                                    <a href="#" className="group flex items-center space-x-4 rounded-md px-3 py-2 text-gray-600 justify-normal dark:text-gray-300" id="tests">
                                        <i className=" fas fa-flask"></i>
                                    </a>
                                </div>
                            </li>
                            <li className="relative" id="tasks">
                                <div className="tooltip tooltip-right" data-tip="Tasks">
                                    <span
                                        className="group flex items-center space-x-4 rounded-md px-3 py-2 text-gray-600 justify-normal dark:text-gray-300 cursor-pointer"
                                        id="tasks"
                                        onClick={toggleDropdowntask}
                                    >
                                        <i class="fa-regular fa-star"></i>
                                    </span>
                                </div>
                                <ul
                                    className={`absolute z-10 bg-white duration-300 ease-in top-full left-0 w-48 ${isDropdownOpentask ? 'block' : 'hidden'
                                        }`}
                                    id="dropdown-menu"
                                >
                                    <li className="">
                                        <Link
                                            to={"create-form"}
                                            className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 justify-normal dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            id="tests_prices"
                                            onClick={closeDropdowntask}
                                        >
                                            <i className="far fa-circle"></i>
                                            <p>Create Form</p>
                                        </Link>
                                    </li>
                                    <li className="">
                                        <Link
                                            to={"update-form"}
                                            className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 justify-normal dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            id="tests_prices"
                                            onClick={closeDropdowntask}
                                        >
                                            <i className="far fa-circle"></i>
                                            <p>Update Form</p>
                                        </Link>
                                    </li>
                                    <li className="">
                                        <Link
                                            to={"table"}
                                            className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 justify-normal dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            id="cultures_prices"
                                            onClick={closeDropdowntask}
                                        >
                                            <i className="far fa-circle"></i>
                                            <p>Table</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <div className="tooltip tooltip-right" data-tip="Cultures">
                                    <a href="#" className="group flex items-center space-x-4 rounded-md px-3 py-2 text-gray-600 justify-normal dark:text-gray-300" id="cultures">
                                        <i className=" fas fa-vial"></i>
                                    </a>
                                </div>
                            </li>

                            <li>
                                <div className="tooltip tooltip-right" data-tip="Culture Options">
                                    <a href="#" className="group flex items-center space-x-4 rounded-md px-3 py-2 text-gray-600 justify-normal dark:text-gray-300" id="culture_options">
                                        <i className=" fas fa-vial"></i>
                                    </a>
                                </div>
                            </li>

                            <li>
                                <div className="tooltip tooltip-right" data-tip="Antibiotics">
                                    <a href="#" className="group flex items-center space-x-4 rounded-md px-3 py-2 text-gray-600 justify-normal dark:text-gray-300" id="antibiotics">
                                        <i className=" fas fa-capsules"></i>
                                    </a>
                                </div>
                            </li>

                            <li>
                                <div className="tooltip tooltip-right" data-tip="Doctors">
                                    <a href="#" className="group flex items-center space-x-4 rounded-md px-3 py-2 text-gray-600 justify-normal dark:text-gray-300" id="doctors">
                                        <i className=" fa fa-user-md"></i>
                                    </a>
                                </div>
                            </li>

                            <li className="relative" id="prices">
                                <div className="tooltip tooltip-right" data-tip="Price List">
                                    <a
                                        href="#"
                                        className="flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 justify-normal dark:text-gray-300"
                                        id="prices_link"
                                        onClick={toggleDropdown}
                                    >
                                        <i className="fas fa-list"></i>
                                    </a>
                                </div>
                                <ul
                                    className={`absolute z-10 bg-white rounded-md shadow-lg transition-all duration-200 top-full left-0 w-48 ${isDropdownOpen ? 'visible opacity-100' : 'invisible opacity-0'
                                        }`}
                                    id="dropdown-menu"
                                >
                                    <li className="">
                                        <a
                                            href="#"
                                            className="flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 justify-normal dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            id="tests_prices"
                                            onClick={closeDropdown}
                                        >
                                            <i className="far fa-circle"></i>
                                            <p>Tests</p>
                                        </a>
                                    </li>
                                    <li className="">
                                        <a
                                            href="#"
                                            className="flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 justify-normal dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            id="cultures_prices"
                                            onClick={closeDropdown}
                                        >
                                            <i className="far fa-circle"></i>
                                            <p>Culture</p>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    {user ?
                        <div className="-mx-6 flex items-center justify-between border-t px-6 pt-4 dark:border-gray-700" onClick={logout}>
                            <button className="group flex items-center rounded-md px-2 py-2 text-gray-600 dark:text-gray-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                            </button>
                        </div>
                        : <></>
                    }
                </aside>}
                <div className={visible ? "ml-auto mb-6 w-[65%] md:w-[70%] lg:w-[75%] xl:w-[80%] 2xl:w-[85%] duration-300 ease-in" : "ml-auto mb-6 duration-300 ease-in w-[85%] md:w-[90%] lg:w-[85%] xl:w-[90%] 2xl:w-[95%]"}>
                    <div className="sticky top-0 h-16 border-b bg-white dark:bg-gray-800 dark:border-gray-700 lg:py-2.5">
                        <div className="flex items-center justify-between space-x-4 px-6 2xl:container">
                            <div className="">
                                <label tabIndex="0" className="btn btn-ghost text-accent" onClick={toggleVisible}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                                </label>
                            </div>
                            <h5 hidden className="text-2xl font-medium text-gray-600 lg:block dark:text-white">Dashboard</h5>
                            <div className="flex space-x-4">
                                <div hidden className="md:block">
                                    <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
                                        <span className="absolute left-4 flex h-6 items-center border-r border-gray-300 pr-3 dark:border-gray-700">
                                            <svg
                                                xmlns="http://ww50w3.org/2000/svg"
                                                className="w-4 fill-current"
                                                viewBox="0 0 35.997 36.004"
                                            >
                                                <path
                                                    id="Icon_awesome-search"
                                                    data-name="search"
                                                    d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"
                                                ></path>
                                            </svg>
                                        </span>
                                        <input
                                            type="search"
                                            name="leadingIcon"
                                            id="leadingIcon"
                                            placeholder="Search here"
                                            className="outline-none w-full rounded-xl border border-gray-300 py-2.5 pl-14 pr-4 text-sm text-gray-600 transition focus:border-cyan-300 dark:bg-gray-900 dark:border-gray-700"
                                        />
                                    </div>
                                </div>
                                <button
                                    aria-label="search"
                                    className="h-10 w-10 rounded-xl border bg-gray-100 active:bg-gray-200 md:hidden dark:bg-gray-700 dark:border-gray-600 dark:active:bg-gray-800"
                                >
                                    <svg
                                        xmlns="http://ww50w3.org/2000/svg"
                                        className="mx-auto w-4 fill-current text-gray-600 dark:text-gray-300"
                                        viewBox="0 0 35.997 36.004"
                                    >
                                        <path
                                            id="Icon_awesome-search"
                                            data-name="search"
                                            d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"
                                        ></path>
                                    </svg>
                                </button>
                                <button
                                    aria-label="chat"
                                    className="h-10 w-10 rounded-xl border bg-gray-100 active:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:active:bg-gray-800"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="m-auto h-5 w-5 text-gray-600 dark:text-gray-300"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                        />
                                    </svg>
                                </button>
                                <button
                                    aria-label="notification"
                                    className="h-10 w-10 rounded-xl border bg-gray-100 active:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:active:bg-gray-800"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="m-auto h-5 w-5 text-gray-600 dark:text-gray-300"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Home;