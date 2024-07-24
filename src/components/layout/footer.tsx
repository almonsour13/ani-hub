const Footer = () => {
    return(
        <div className="w-full bg-base-200">
            <div className="lg:w-9/12 w-full mx-auto lg:px-0 px-5 p-2">
                <div className="w-full h-auto flex items-center justify-left gap-3">
                        <a className="text-xl font-bold" href="/">
                            <img
                                className="h-12 w-12"
                                src="assets/icon/icon.png"
                                alt="icon"
                            />
                        </a>
                        <h2 className="font-bold">AniZen</h2>
                        <p>© 2024</p>
                </div>
            </div>
        </div>
    );
}
 export default Footer;