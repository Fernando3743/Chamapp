"use client";

export default function CustomerInfo({ customer }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* Personal Information */}
      <div className="glass border border-white/20 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <span className="text-white/70 cursor-pointer hover:text-white transition-colors">
            ✏️
          </span>
        </div>
        <div className="space-y-5">
          <div className="flex justify-between items-start pb-5 border-b border-white/10">
            <div>
              <div className="text-sm text-white/70 mb-1">Full Name</div>
              <div className="text-sm font-medium">{customer.name}</div>
            </div>
          </div>
          <div className="flex justify-between items-start pb-5 border-b border-white/10">
            <div>
              <div className="text-sm text-white/70 mb-1">Date of Birth</div>
              <div className="text-sm font-medium">{customer.birthDate}</div>
            </div>
          </div>
          <div className="flex justify-between items-start pb-5 border-b border-white/10">
            <div>
              <div className="text-sm text-white/70 mb-1">Gender</div>
              <div className="text-sm font-medium">{customer.gender}</div>
            </div>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-white/70 mb-1">Preferred Language</div>
              <div className="text-sm font-medium">
                {customer.preferredLanguage}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="glass border border-white/20 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          <span className="text-white/70 cursor-pointer hover:text-white transition-colors">
            ✏️
          </span>
        </div>
        <div className="space-y-5">
          <div className="flex justify-between items-start pb-5 border-b border-white/10">
            <div>
              <div className="text-sm text-white/70 mb-1">Email</div>
              <div className="text-sm font-medium">{customer.email}</div>
            </div>
          </div>
          <div className="flex justify-between items-start pb-5 border-b border-white/10">
            <div>
              <div className="text-sm text-white/70 mb-1">Phone</div>
              <div className="text-sm font-medium">{customer.phone}</div>
            </div>
          </div>
          <div className="flex justify-between items-start pb-5 border-b border-white/10">
            <div>
              <div className="text-sm text-white/70 mb-1">Address</div>
              <div className="text-sm font-medium whitespace-pre-line">
                {customer.address}
              </div>
            </div>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-white/70 mb-1">Emergency Contact</div>
              <div className="text-sm font-medium whitespace-pre-line">
                {customer.emergencyContact}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="glass border border-white/20 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Preferences</h3>
          <span className="text-white/70 cursor-pointer hover:text-white transition-colors">
            ✏️
          </span>
        </div>
        <div className="space-y-5">
          <div className="flex justify-between items-start pb-5 border-b border-white/10">
            <div>
              <div className="text-sm text-white/70 mb-1">Preferred Services</div>
              <div className="text-sm font-medium">
                {customer.preferredServices.join(", ")}
              </div>
            </div>
          </div>
          <div className="flex justify-between items-start pb-5 border-b border-white/10">
            <div>
              <div className="text-sm text-white/70 mb-1">Preferred Staff</div>
              <div className="text-sm font-medium">
                {customer.preferredStaff.join(", ")}
              </div>
            </div>
          </div>
          <div className="flex justify-between items-start pb-5 border-b border-white/10">
            <div>
              <div className="text-sm text-white/70 mb-1">Allergies/Sensitivities</div>
              <div className="text-sm font-medium">{customer.allergies}</div>
            </div>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-white/70 mb-1">Marketing Preferences</div>
              <div className="text-sm font-medium">
                Email: {customer.marketingPreferences.email ? "✓" : "✗"} SMS:{" "}
                {customer.marketingPreferences.sms ? "✓" : "✗"} Push:{" "}
                {customer.marketingPreferences.push ? "✓" : "✗"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Membership & Loyalty */}
      <div className="glass border border-white/20 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Membership & Loyalty</h3>
          <span className="text-white/70 cursor-pointer hover:text-white transition-colors">
            ✏️
          </span>
        </div>
        <div className="space-y-5">
          <div className="flex justify-between items-start pb-5 border-b border-white/10">
            <div>
              <div className="text-sm text-white/70 mb-1">Membership Type</div>
              <div className="text-sm font-medium">{customer.membershipType}</div>
            </div>
          </div>
          <div className="flex justify-between items-start pb-5 border-b border-white/10">
            <div>
              <div className="text-sm text-white/70 mb-1">Member Since</div>
              <div className="text-sm font-medium">{customer.memberSince}</div>
            </div>
          </div>
          <div className="flex justify-between items-start pb-5 border-b border-white/10">
            <div>
              <div className="text-sm text-white/70 mb-1">Loyalty Points</div>
              <div className="text-sm font-medium">
                {customer.loyaltyPoints.toLocaleString()} points
              </div>
            </div>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-white/70 mb-1">Referrals Made</div>
              <div className="text-sm font-medium">
                {customer.referrals} customers
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}