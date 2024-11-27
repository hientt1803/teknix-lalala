const LocationSection = () => {
    return (
        <div className="border border-slate-200 dark:border-slate-700 p-4 rounded-2xl space-y-8">
            <div>
                <h2 className="text-2xl font-semibold">Location</h2>
                <span className="block mt-2 text-slate-500 dark:text-slate-300">
                    San Diego, CA, United States of America (SAN-San Diego Intl.)
                </span>
            </div>
            <div className="w-14 border-b border-slate-200 dark:border-slate-700"></div>
            <div className="aspect-video w-full h-full ring-1 overflow-hidden rounded-xl z-0">
                <iframe
                    className="w-full h-full"
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAGVJfZMAKYfZ71nzL_v5i3LjTTWnCYwTY&q=Eiffel+Tower,Paris+France"
                    title="Google map"
                    style={{border: 0}}
                />
            </div>
        </div>
    );
};

export default LocationSection;
