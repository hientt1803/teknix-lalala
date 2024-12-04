import InputLabel from '@/components/custom/input/input-label';
import { Button } from '@/components/ui/button';

const TabChangePassword = () => {
  return (
    <div className="pb-24 pt-14 sm:pt-20 lg:pb-32">
      <div className="space-y-6 sm:space-y-8">
        <h2 className="text-3xl font-semibold">Update your password</h2>
        <div className="w-14 border-b border-neutral-200" />
        <div className="flex flex-col md:flex-row">
          <div className="max-w-lg flex-grow space-y-6">
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
                placeholder={'Confirm password'}
                sizes="small"
              />
            </div>
            <div className="pt-2">
              <Button className="focus:ring-primary-600 relative inline-flex h-auto items-center justify-center rounded-full px-4 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-0 sm:px-6 sm:text-base">
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
