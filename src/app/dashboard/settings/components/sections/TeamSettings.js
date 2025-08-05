"use client";

import { memo, useCallback, useState } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { settingsTranslations } from "@/lib/translations/pages/settings";
import SettingsSection from "../shared/SettingsSection";
import Button from "../shared/Button";
import ToggleSwitch from "../shared/ToggleSwitch";
import { PERMISSION_TYPES } from "../../constants";

const TeamMember = memo(({ member, onEdit, onRemove }) => {
  const { language } = useLanguage();
  const t = useCallback(
    (key) =>
      settingsTranslations[key]?.[language] ||
      settingsTranslations[key]?.en ||
      key,
    [language]
  );

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-5 bg-white/5 rounded-xl transition-all duration-300 hover:bg-white/8 gap-4">
      <div className="flex items-center gap-4 flex-1">
        <div className="w-12 h-12 bg-primary-gradient rounded-full flex items-center justify-center font-semibold text-white">
          {member.initials}
        </div>
        <div className="text-center md:text-left">
          <h4 className="text-base font-medium">{member.name}</h4>
          <p className="text-xs text-text-secondary">
            {t(member.role)} • {t(member.accessLevel)}
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onEdit(member.id)}
        >
          {t('edit')}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onRemove(member.id)}
        >
          {t('remove')}
        </Button>
      </div>
    </div>
  );
});

TeamMember.displayName = 'TeamMember';

const TeamSettings = memo(() => {
  const { language } = useLanguage();
  const t = useCallback(
    (key) =>
      settingsTranslations[key]?.[language] ||
      settingsTranslations[key]?.en ||
      key,
    [language]
  );

  // Mock team members data
  const [teamMembers] = useState([
    {
      id: 1,
      name: 'Emily Johnson',
      initials: 'EJ',
      role: 'seniorStylist',
      accessLevel: 'fullAccess'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      initials: 'MG',
      role: 'nailTechnician',
      accessLevel: 'limitedAccess'
    },
    {
      id: 3,
      name: 'Robert Chen',
      initials: 'RC',
      role: 'massageTherapist',
      accessLevel: 'limitedAccess'
    }
  ]);

  // Permission settings state
  const [permissions, setPermissions] = useState(
    PERMISSION_TYPES.reduce((acc, perm) => ({
      ...acc,
      [perm.key]: perm.defaultValue
    }), {})
  );

  const handleAddTeamMember = useCallback(() => {
    // TODO: Implement add team member functionality
    console.log('Add team member clicked');
  }, []);

  const handleEditMember = useCallback((memberId) => {
    // TODO: Implement edit member functionality
    console.log('Edit member:', memberId);
  }, []);

  const handleRemoveMember = useCallback((memberId) => {
    // TODO: Implement remove member functionality
    console.log('Remove member:', memberId);
  }, []);

  const handlePermissionToggle = useCallback((permissionKey, value) => {
    setPermissions(prev => ({
      ...prev,
      [permissionKey]: value
    }));
  }, []);

  return (
    <>
      {/* Team Members */}
      <SettingsSection
        title={t('teamMembers')}
        description={t('teamMembersDesc')}
        className="mb-6"
        actions={
          <Button
            variant="primary"
            size="sm"
            onClick={handleAddTeamMember}
          >
            <span>+</span> {t('addTeamMember')}
          </Button>
        }
      >
        <div className="space-y-4">
          {teamMembers.map(member => (
            <TeamMember
              key={member.id}
              member={member}
              onEdit={handleEditMember}
              onRemove={handleRemoveMember}
            />
          ))}
        </div>
      </SettingsSection>

      {/* Permission Settings */}
      <SettingsSection
        title={t('permissionSettings')}
        description={t('permissionSettingsDesc')}
      >
        <div className="space-y-4">
          {PERMISSION_TYPES.map((permission, index) => (
            <div
              key={permission.key}
              className={`${index < PERMISSION_TYPES.length - 1 ? 'border-b border-white/10' : ''}`}
            >
              <ToggleSwitch
                id={`perm-${permission.key}`}
                name={`perm-${permission.key}`}
                checked={permissions[permission.key]}
                onChange={(checked) => handlePermissionToggle(permission.key, checked)}
                label={t(permission.key)}
                description={t(permission.descriptionKey)}
              />
            </div>
          ))}
        </div>
      </SettingsSection>
    </>
  );
});

TeamSettings.displayName = 'TeamSettings';

export default TeamSettings;