import {
  useMemo,
  useState,
} from "react";

import {
  SettingsHeader,
} from "./components/SettingsHeader";

import {
  SettingsSidebar,
} from "./components/SettingsSidebar";

import {
  SettingsProfile,
} from "./components/SettingsProfile";

import {
  SettingsOrganization,
} from "./components/SettingsOrganization";

import {
  SettingsFlightSchool,
} from "./components/SettingsFlightSchool";

import {
  SettingsUsers,
} from "./components/SettingsUsers";

import {
  SettingsRoles,
} from "./components/SettingsRoles";

import {
  SettingsNotifications,
} from "./components/SettingsNotifications";

import {
  SettingsIntegrations,
} from "./components/SettingsIntegrations";

import {
  SettingsPreferences,
} from "./components/SettingsPreferences";

import {
  SettingsSecurity,
} from "./components/SettingsSecurity";

import {
  SettingsSaveBar,
} from "./components/SettingsSaveBar";

import {
  flightSchoolData,
  integrationData,
  notificationData,
  organizationData,
  preferenceData,
  profileData,
  rolePermissions,
  securityData,
  settingsUsers,
  type PermissionKey,
  type SettingsSection,
  type UserRole,
} from "./settingsData";

export function Settings() {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>(
      "profile",
    );

  const [profile, setProfile] =
    useState(profileData);

  const [organization, setOrganization] =
    useState(organizationData);

  const [flightSchool, setFlightSchool] =
    useState(flightSchoolData);

  const [users, setUsers] =
    useState(settingsUsers);

  const [roles, setRoles] =
    useState(rolePermissions);

  const [selectedRole, setSelectedRole] =
    useState<UserRole>(
      "Administrator",
    );

  const [notifications, setNotifications] =
    useState(notificationData);

  const [integrations, setIntegrations] =
    useState(integrationData);

  const [preferences, setPreferences] =
    useState(preferenceData);

  const [security, setSecurity] =
    useState(securityData);

  const [hasChanges, setHasChanges] =
    useState(false);

  const [isSaving, setIsSaving] =
    useState(false);

  const [saved, setSaved] =
    useState(false);

  const markChanged = () => {
    setHasChanges(true);
    setSaved(false);
  };

  const handleProfileChange = (
    data: typeof profile,
  ) => {
    setProfile(data);
    markChanged();
  };

  const handleOrganizationChange = (
    data: typeof organization,
  ) => {
    setOrganization(data);
    markChanged();
  };

  const handleFlightSchoolChange = (
    data: typeof flightSchool,
  ) => {
    setFlightSchool(data);
    markChanged();
  };

  const handleNotificationsChange = (
    data: typeof notifications,
  ) => {
    setNotifications(data);
    markChanged();
  };

  const handlePreferencesChange = (
    data: typeof preferences,
  ) => {
    setPreferences(data);
    markChanged();
  };

  const handleSecurityChange = (
    data: typeof security,
  ) => {
    setSecurity(data);
    markChanged();
  };

  const handleRoleChange = (
    role: UserRole,
  ) => {
    setSelectedRole(role);
  };

  const handlePermissionChange = (
    role: UserRole,
    permission: PermissionKey,
  ) => {
    setRoles((previous) =>
      previous.map((item) =>
        item.role === role
          ? {
              ...item,
              permissions: {
                ...item.permissions,
                [permission]:
                  !item.permissions[
                    permission
                  ],
              },
            }
          : item,
      ),
    );

    markChanged();
  };

  const handleConnect = (
    integrationId: string,
  ) => {
    setIntegrations((previous) =>
      previous.map((integration) =>
        integration.id ===
        integrationId
          ? {
              ...integration,
              status: "Connected",
            }
          : integration,
      ),
    );

    markChanged();
  };

  const handleAddUser = () => {
    const newUser = {
      id: `USR-${String(
        users.length + 1,
      ).padStart(3, "0")}`,
      name: "New User",
      email: "new.user@itps.ca",
      role: "Instructor" as UserRole,
      department: "Training",
      status: "Active" as const,
      lastLogin: "Never",
    };

    setUsers((previous) => [
      ...previous,
      newUser,
    ]);

    markChanged();
  };

  const handleSave = () => {
    setIsSaving(true);
    setSaved(false);

    window.setTimeout(() => {
      setIsSaving(false);
      setHasChanges(false);
      setSaved(true);
    }, 700);
  };

  const handleReset = () => {
    setProfile(profileData);
    setOrganization(
      organizationData,
    );
    setFlightSchool(
      flightSchoolData,
    );
    setNotifications(
      notificationData,
    );
    setIntegrations(
      integrationData,
    );
    setPreferences(
      preferenceData,
    );
    setSecurity(securityData);
    setRoles(rolePermissions);
    setUsers(settingsUsers);

    setSelectedRole(
      "Administrator",
    );

    setHasChanges(false);
    setSaved(false);
  };

  const content = useMemo(() => {
    switch (activeSection) {
      case "profile":
        return (
          <SettingsProfile
            data={profile}
            onChange={
              handleProfileChange
            }
          />
        );

      case "organization":
        return (
          <SettingsOrganization
            data={organization}
            onChange={
              handleOrganizationChange
            }
          />
        );

      case "flight-school":
        return (
          <SettingsFlightSchool
            data={flightSchool}
            onChange={
              handleFlightSchoolChange
            }
          />
        );

      case "users":
        return (
          <SettingsUsers
            users={users}
            onAddUser={
              handleAddUser
            }
          />
        );

      case "roles":
        return (
          <SettingsRoles
            roles={roles}
            selectedRole={
              selectedRole
            }
            onRoleChange={
              handleRoleChange
            }
            onPermissionChange={
              handlePermissionChange
            }
          />
        );

      case "notifications":
        return (
          <SettingsNotifications
            data={notifications}
            onChange={
              handleNotificationsChange
            }
          />
        );

      case "integrations":
        return (
          <SettingsIntegrations
            integrations={
              integrations
            }
            onConnect={
              handleConnect
            }
          />
        );

      case "preferences":
        return (
          <SettingsPreferences
            data={preferences}
            onChange={
              handlePreferencesChange
            }
          />
        );

      case "security":
        return (
          <SettingsSecurity
            data={security}
            onChange={
              handleSecurityChange
            }
          />
        );

      default:
        return null;
    }
  }, [
    activeSection,
    profile,
    organization,
    flightSchool,
    users,
    roles,
    selectedRole,
    notifications,
    integrations,
    preferences,
    security,
  ]);

  return (
    <div className="space-y-5 text-[#172033]">
      <SettingsHeader />

      <div className="grid gap-5 lg:grid-cols-[250px_minmax(0,1fr)]">
        <SettingsSidebar
          activeSection={
            activeSection
          }
          onSectionChange={
            setActiveSection
          }
        />

        <div className="min-w-0">
          {content}
        </div>
      </div>

      <SettingsSaveBar
        hasChanges={hasChanges}
        isSaving={isSaving}
        saved={saved}
        onSave={handleSave}
        onReset={handleReset}
      />
    </div>
  );
}

export default Settings;