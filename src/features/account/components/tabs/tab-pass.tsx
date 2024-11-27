import InputLabel from "@/components/custom/input/input-label";
import {Button} from "@/components/ui/button";

const TabChangePassword = () => {
    return (
        <div className="pt-14 sm:pt-20 pb-24 lg:pb-32">
            <div className="space-y-6 sm:space-y-8">
                <h2 className="text-3xl font-semibold">Update your password</h2>
                <div className="w-14 border-b border-slate-200" />
                <div className="flex flex-col md:flex-row">
                    <div className="flex-grow max-w-lg space-y-6">
                        <div>
                            <InputLabel
                                label="Current password"
                                placeholder="Current password"
                                sizes="small"
                            />
                        </div>
                        <div>
                            <InputLabel
                                label="New password"
                                placeholder="New password"
                                sizes="small"
                            />
                        </div>
                        <div>
                            <InputLabel
                                label="Confirm password"
                                placeholder={"Confirm password"}
                                sizes="small"
                            />
                        </div>
                        <div className="pt-2">
                            <Button className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 dark:focus:ring-offset-0">
                                Update password
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TabChangePassword;
