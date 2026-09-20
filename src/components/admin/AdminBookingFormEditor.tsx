import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { BookingFormConfig, BookingFormChecklistOption } from '../../types';
import {
  Sliders,
  CheckCircle2,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  Eye,
  Mail,
  MapPin,
  Sparkles,
  BedDouble,
  Users,
  Check
} from 'lucide-react';

export const AdminBookingFormEditor: React.FC = () => {
  const { config, updateBookingFormConfig, openBookingModal } = useHotel();
  const currentConfig: BookingFormConfig = config.bookingForm || {
    badgeText: 'Direct Front Desk Reservation',
    modalTitle: 'Request Room Booking • Hotel Royal Retreat',
    locationHighlight: 'Directly Opposite Gate No. 2 (100 Meters to Samadhi Mandir)',
    subHighlight: 'Zero Commission',
    enableDevotionalChecklist: true,
    devotionalSectionTitle: '3. Pilgrim Care & Yatra Preferences',
    devotionalOptions: [
      {
        id: 'aarti_water',
        label: '3:30 AM Kakad Aarti Hot Water',
        sublabel: 'Guaranteed high-pressure geyser hot water before morning Aarti',
        defaultChecked: true,
        enabled: true
      },
      {
        id: 'senior_care',
        label: 'Senior Citizen Room Near Elevator',
        sublabel: 'Lower floors with step-free wheelchair accessibility',
        defaultChecked: false,
        enabled: true
      },
      {
        id: 'jain_food',
        label: 'Jain Satvik Pure Veg Meals',
        sublabel: 'Freshly prepared meals without onion, garlic or root vegetables',
        defaultChecked: false,
        enabled: true
      },
      {
        id: 'airport_taxi',
        label: 'Airport / Railway Station Taxi Pickup',
        sublabel: 'Private verified cab transfer from Shirdi Airport or Sainagar Station',
        defaultChecked: false,
        enabled: true
      }
    ],
    enableSpecialNotes: true,
    specialNotesLabel: 'Special Notes or Arrival Timings (Optional)',
    specialNotesPlaceholder: 'e.g. Expected arrival at 11:00 AM / Aarti pass assistance...',
    submitButtonText: 'Submit Room Booking Request',
    confirmationNotice: 'Direct Front Desk Assurance: Zero advance lock-in required for request submission. Pay comfortably at check-in.',
    allowInstantEmailReceipt: true,
    defaultGuestSelection: '2 Adults',
    guestOptions: [
      '1 Adult',
      '2 Adults',
      '3 Adults',
      '4 Adults (Family)',
      '2 Adults, 1 Child',
      '2 Adults, 2 Children',
      'Large Pilgrim Group (5+)'
    ],
    depositPolicyNote: 'Zero advance payment required to register your booking request. Our desk locks in direct tariff rates.',
    helplineDisplay: '+91 90490 40902',
    emailAcknowledgement: {
      enabled: true,
      subjectPrefix: 'Booking Request Registered',
      welcomeGreeting: 'Jai Sai Ram',
      customClosingRemarks: 'Our front desk team will contact you shortly to confirm your room reservation and ensure a spiritually enriching stay in holy Shirdi.'
    }
  };

  const [formState, setFormState] = useState<BookingFormConfig>(() => JSON.parse(JSON.stringify(currentConfig)));
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [newOptionLabel, setNewOptionLabel] = useState('');
  const [newOptionSublabel, setNewOptionSublabel] = useState('');
  const [newGuestOption, setNewGuestOption] = useState('');

  const handleSave = () => {
    updateBookingFormConfig(formState);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleResetToCurrent = () => {
    setFormState(JSON.parse(JSON.stringify(currentConfig)));
  };

  const handleAddChecklistOption = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOptionLabel.trim()) return;

    const newOpt: BookingFormChecklistOption = {
      id: 'opt_' + Date.now(),
      label: newOptionLabel.trim(),
      sublabel: newOptionSublabel.trim() || undefined,
      defaultChecked: false,
      enabled: true
    };

    setFormState(prev => ({
      ...prev,
      devotionalOptions: [...prev.devotionalOptions, newOpt]
    }));

    setNewOptionLabel('');
    setNewOptionSublabel('');
  };

  const handleDeleteChecklistOption = (id: string) => {
    setFormState(prev => ({
      ...prev,
      devotionalOptions: prev.devotionalOptions.filter(o => o.id !== id)
    }));
  };

  const handleToggleOptionEnabled = (id: string) => {
    setFormState(prev => ({
      ...prev,
      devotionalOptions: prev.devotionalOptions.map(o =>
        o.id === id ? { ...o, enabled: !o.enabled } : o
      )
    }));
  };

  const handleToggleOptionDefaultChecked = (id: string) => {
    setFormState(prev => ({
      ...prev,
      devotionalOptions: prev.devotionalOptions.map(o =>
        o.id === id ? { ...o, defaultChecked: !o.defaultChecked } : o
      )
    }));
  };

  const handleUpdateOptionText = (id: string, field: 'label' | 'sublabel', value: string) => {
    setFormState(prev => ({
      ...prev,
      devotionalOptions: prev.devotionalOptions.map(o =>
        o.id === id ? { ...o, [field]: value } : o
      )
    }));
  };

  const handleAddGuestOption = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestOption.trim()) return;
    if (formState.guestOptions.includes(newGuestOption.trim())) return;

    setFormState(prev => ({
      ...prev,
      guestOptions: [...prev.guestOptions, newGuestOption.trim()]
    }));
    setNewGuestOption('');
  };

  const handleDeleteGuestOption = (item: string) => {
    setFormState(prev => ({
      ...prev,
      guestOptions: prev.guestOptions.filter(g => g !== item),
      defaultGuestSelection: prev.defaultGuestSelection === item
        ? (prev.guestOptions[0] || '2 Adults')
        : prev.defaultGuestSelection
    }));
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top Banner & Action Controls */}
      <div className="bg-[#1f130a] rounded-2xl p-6 border border-[#b45309]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#b45309] text-white">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#fcfbf7]">
              Online Booking Form Editor
            </h3>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/20 text-[#f59e0b] font-bold border border-amber-500/30 uppercase tracking-wider">
              Live Customizer
            </span>
          </div>
          <p className="text-xs text-[#d6c2a8] mt-1.5 max-w-2xl">
            Configure all aspects of the devotee reservation popup: titles, zero-commission banners, devotional care checkboxes, guest count choices, and instant email dispatch rules.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => openBookingModal()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/20 transition-colors cursor-pointer"
            title="Open booking modal in preview"
          >
            <Eye className="w-4 h-4 text-[#f59e0b]" />
            <span>Test Form</span>
          </button>

          <button
            type="button"
            onClick={handleResetToCurrent}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs font-semibold border border-red-800/40 transition-colors cursor-pointer"
            title="Discard unsaved changes"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Discard</span>
          </button>

          <button
            type="button"
            id="admin-save-booking-form-btn"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#b45309] hover:bg-[#d97706] text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            {saveSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Changes Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Configuration</span>
              </>
            )}
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Online Booking Form settings updated successfully and saved to storage. Changes are live on the website immediately.</span>
        </div>
      )}

      {/* Section 1: Header, Titles & Location Badges */}
      <div className="bg-[#170e07] rounded-2xl p-6 border border-[#b45309]/20 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#b45309]/20">
          <div>
            <h4 className="font-serif text-base font-bold text-[#fcfbf7] flex items-center gap-2">
              <BedDouble className="w-4 h-4 text-[#f59e0b]" />
              <span>1. Modal Header, Titles & Direct Reservation Badges</span>
            </h4>
            <p className="text-xs text-[#d6c2a8]/70">
              Customize the titles and trust assurances that greet the pilgrim when opening the booking popup.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#d6c2a8] mb-1.5">
              Modal Top Badge Text
            </label>
            <input
              type="text"
              value={formState.badgeText}
              onChange={e => setFormState(prev => ({ ...prev, badgeText: e.target.value }))}
              placeholder="e.g. Direct Front Desk Reservation"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#23150d] border border-[#b45309]/40 text-white text-xs focus:outline-none focus:border-[#f59e0b]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#d6c2a8] mb-1.5">
              Modal Main Title
            </label>
            <input
              type="text"
              value={formState.modalTitle}
              onChange={e => setFormState(prev => ({ ...prev, modalTitle: e.target.value }))}
              placeholder="e.g. Request Room Booking • Hotel Royal Retreat"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#23150d] border border-[#b45309]/40 text-white text-xs focus:outline-none focus:border-[#f59e0b]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#d6c2a8] mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span>Location Highlight Banner</span>
            </label>
            <input
              type="text"
              value={formState.locationHighlight}
              onChange={e => setFormState(prev => ({ ...prev, locationHighlight: e.target.value }))}
              placeholder="e.g. Directly Opposite Gate No. 2 (100 Meters to Samadhi Mandir)"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#23150d] border border-[#b45309]/40 text-white text-xs focus:outline-none focus:border-[#f59e0b]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#d6c2a8] mb-1.5">
              Trust / Commission Tag
            </label>
            <input
              type="text"
              value={formState.subHighlight}
              onChange={e => setFormState(prev => ({ ...prev, subHighlight: e.target.value }))}
              placeholder="e.g. Zero Commission"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#23150d] border border-[#b45309]/40 text-white text-xs focus:outline-none focus:border-[#f59e0b]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#d6c2a8] mb-1.5">
              Submit Button Label
            </label>
            <input
              type="text"
              value={formState.submitButtonText}
              onChange={e => setFormState(prev => ({ ...prev, submitButtonText: e.target.value }))}
              placeholder="e.g. Submit Room Booking Request"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#23150d] border border-[#b45309]/40 text-white text-xs focus:outline-none focus:border-[#f59e0b]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#d6c2a8] mb-1.5">
              Front Desk Helpline Display
            </label>
            <input
              type="text"
              value={formState.helplineDisplay}
              onChange={e => setFormState(prev => ({ ...prev, helplineDisplay: e.target.value }))}
              placeholder="e.g. +91 90490 40902"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#23150d] border border-[#b45309]/40 text-white text-xs focus:outline-none focus:border-[#f59e0b]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#d6c2a8] mb-1.5">
            Footer Policy / Confirmation Notice
          </label>
          <input
            type="text"
            value={formState.confirmationNotice}
            onChange={e => setFormState(prev => ({ ...prev, confirmationNotice: e.target.value }))}
            placeholder="e.g. Direct Front Desk Assurance: Zero advance lock-in required for request submission..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#23150d] border border-[#b45309]/40 text-white text-xs focus:outline-none focus:border-[#f59e0b]"
          />
        </div>
      </div>

      {/* Section 2: Pilgrim Care & Devotional Preferences Checkboxes */}
      <div className="bg-[#170e07] rounded-2xl p-6 border border-[#b45309]/20 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#b45309]/20">
          <div>
            <h4 className="font-serif text-base font-bold text-[#fcfbf7] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#f59e0b]" />
              <span>2. Pilgrim Care & Yatra Preferences (Form Checkboxes)</span>
            </h4>
            <p className="text-xs text-[#d6c2a8]/70">
              Add, remove, or edit the quick devotee checkboxes displayed in the booking popup.
            </p>
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formState.enableDevotionalChecklist}
              onChange={e => setFormState(prev => ({ ...prev, enableDevotionalChecklist: e.target.checked }))}
              className="rounded text-[#b45309] focus:ring-[#f59e0b]"
            />
            <span className="text-xs font-semibold text-[#f59e0b]">Enable Section</span>
          </label>
        </div>

        {formState.enableDevotionalChecklist && (
          <>
            <div>
              <label className="block text-xs font-bold text-[#d6c2a8] mb-1.5">
                Section Heading in Modal
              </label>
              <input
                type="text"
                value={formState.devotionalSectionTitle}
                onChange={e => setFormState(prev => ({ ...prev, devotionalSectionTitle: e.target.value }))}
                placeholder="e.g. 3. Pilgrim Care & Yatra Preferences"
                className="w-full px-3.5 py-2 rounded-xl bg-[#23150d] border border-[#b45309]/40 text-white text-xs focus:outline-none focus:border-[#f59e0b]"
              />
            </div>

            {/* Existing Options List */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#d6c2a8]/70 block">
                Active Preferences Checklist ({formState.devotionalOptions.length} Items)
              </span>

              {formState.devotionalOptions.map(opt => (
                <div
                  key={opt.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    opt.enabled
                      ? 'bg-[#23150d] border-[#b45309]/40'
                      : 'bg-[#1a1009]/60 border-white/10 opacity-60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={opt.label}
                          onChange={e => handleUpdateOptionText(opt.id, 'label', e.target.value)}
                          placeholder="Preference title..."
                          className="flex-1 px-3 py-1.5 rounded-lg bg-[#140b05] border border-white/10 text-xs font-bold text-white focus:outline-none focus:border-[#f59e0b]"
                        />
                      </div>
                      <input
                        type="text"
                        value={opt.sublabel || ''}
                        onChange={e => handleUpdateOptionText(opt.id, 'sublabel', e.target.value)}
                        placeholder="Description note for devotee (optional)..."
                        className="w-full px-3 py-1.5 rounded-lg bg-[#140b05] border border-white/10 text-[11px] text-[#d6c2a8] focus:outline-none focus:border-[#f59e0b]"
                      />
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                      <label className="flex items-center gap-1.5 text-[11px] text-[#d6c2a8] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={opt.defaultChecked}
                          onChange={() => handleToggleOptionDefaultChecked(opt.id)}
                          className="rounded text-[#b45309] focus:ring-[#f59e0b]"
                        />
                        <span>Pre-checked</span>
                      </label>

                      <button
                        type="button"
                        onClick={() => handleToggleOptionEnabled(opt.id)}
                        className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                          opt.enabled
                            ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40'
                            : 'bg-white/10 text-white/60 border border-white/10'
                        }`}
                      >
                        {opt.enabled ? 'Visible' : 'Hidden'}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteChecklistOption(opt.id)}
                        className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
                        title="Delete option"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Checklist Option Form */}
            <form onSubmit={handleAddChecklistOption} className="p-4 rounded-xl bg-[#23150d]/80 border border-[#b45309]/30 space-y-3">
              <span className="text-xs font-bold text-[#f59e0b] block flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" />
                <span>Add Custom Pilgrim Preference Item</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  type="text"
                  required
                  value={newOptionLabel}
                  onChange={e => setNewOptionLabel(e.target.value)}
                  placeholder="e.g. Temple Gate Wheelchair Assistance"
                  className="px-3 py-2 rounded-xl bg-[#140b05] border border-white/15 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                />
                <input
                  type="text"
                  value={newOptionSublabel}
                  onChange={e => setNewOptionSublabel(e.target.value)}
                  placeholder="e.g. Free escort wheelchair at Temple Gate No. 2"
                  className="px-3 py-2 rounded-xl bg-[#140b05] border border-white/15 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#b45309] hover:bg-[#d97706] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Checklist Option</span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>

      {/* Section 3: Occupancy & Special Notes Settings */}
      <div className="bg-[#170e07] rounded-2xl p-6 border border-[#b45309]/20 space-y-4">
        <div className="pb-3 border-b border-[#b45309]/20">
          <h4 className="font-serif text-base font-bold text-[#fcfbf7] flex items-center gap-2">
            <Users className="w-4 h-4 text-[#f59e0b]" />
            <span>3. Guest Occupancy Choices & Notes Field</span>
          </h4>
          <p className="text-xs text-[#d6c2a8]/70">
            Define default guest selections and whether the special requirements note is displayed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#d6c2a8] mb-1.5">
              Default Guest Selection
            </label>
            <select
              value={formState.defaultGuestSelection}
              onChange={e => setFormState(prev => ({ ...prev, defaultGuestSelection: e.target.value }))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#23150d] border border-[#b45309]/40 text-white text-xs focus:outline-none focus:border-[#f59e0b]"
            >
              {formState.guestOptions.map(opt => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#d6c2a8] mb-1.5">
              Special Notes Field
            </label>
            <div className="flex items-center gap-3 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#d6c2a8]">
                <input
                  type="checkbox"
                  checked={formState.enableSpecialNotes}
                  onChange={e => setFormState(prev => ({ ...prev, enableSpecialNotes: e.target.checked }))}
                  className="rounded text-[#b45309] focus:ring-[#f59e0b]"
                />
                <span>Enable Devotee Notes / Arrival Timings Textarea</span>
              </label>
            </div>
          </div>
        </div>

        {formState.enableSpecialNotes && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-[#d6c2a8] mb-1.5">
                Special Notes Field Label
              </label>
              <input
                type="text"
                value={formState.specialNotesLabel}
                onChange={e => setFormState(prev => ({ ...prev, specialNotesLabel: e.target.value }))}
                placeholder="e.g. Special Notes or Arrival Timings (Optional)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#23150d] border border-[#b45309]/40 text-white text-xs focus:outline-none focus:border-[#f59e0b]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#d6c2a8] mb-1.5">
                Special Notes Placeholder
              </label>
              <input
                type="text"
                value={formState.specialNotesPlaceholder}
                onChange={e => setFormState(prev => ({ ...prev, specialNotesPlaceholder: e.target.value }))}
                placeholder="e.g. Expected arrival at 11:00 AM..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#23150d] border border-[#b45309]/40 text-white text-xs focus:outline-none focus:border-[#f59e0b]"
              />
            </div>
          </div>
        )}

        {/* Guest Options Manager */}
        <div className="pt-3 border-t border-[#b45309]/20 space-y-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#d6c2a8]/70 block">
            Occupancy Options in Dropdown ({formState.guestOptions.length} Options)
          </span>
          <div className="flex flex-wrap gap-2">
            {formState.guestOptions.map(opt => (
              <span
                key={opt}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#23150d] border border-[#b45309]/40 text-xs text-white font-medium"
              >
                <span>{opt}</span>
                {formState.guestOptions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDeleteGuestOption(opt)}
                    className="text-red-400 hover:text-red-300 ml-1 cursor-pointer"
                    title="Remove option"
                  >
                    ×
                  </button>
                )}
              </span>
            ))}
          </div>

          <form onSubmit={handleAddGuestOption} className="flex gap-2 max-w-md pt-1">
            <input
              type="text"
              value={newGuestOption}
              onChange={e => setNewGuestOption(e.target.value)}
              placeholder="e.g. 3 Adults, 1 Child"
              className="flex-1 px-3 py-1.5 rounded-xl bg-[#23150d] border border-white/15 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-xl bg-[#b45309] hover:bg-[#d97706] text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Add Option
            </button>
          </form>
        </div>
      </div>

      {/* Section 4: Automated Email Acknowledgement Settings */}
      <div className="bg-[#170e07] rounded-2xl p-6 border border-[#b45309]/20 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#b45309]/20">
          <div>
            <h4 className="font-serif text-base font-bold text-[#fcfbf7] flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#f59e0b]" />
              <span>4. Automated Confirmation Email Settings</span>
            </h4>
            <p className="text-xs text-[#d6c2a8]/70">
              Customize the automatic confirmation message dispatched to devotee email immediately upon form submission.
            </p>
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formState.allowInstantEmailReceipt}
              onChange={e => setFormState(prev => ({ ...prev, allowInstantEmailReceipt: e.target.checked }))}
              className="rounded text-[#b45309] focus:ring-[#f59e0b]"
            />
            <span className="text-xs font-semibold text-[#f59e0b]">Enable Email Dispatch</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#d6c2a8] mb-1.5">
              Email Subject Line Prefix
            </label>
            <input
              type="text"
              value={formState.emailAcknowledgement.subjectPrefix}
              onChange={e =>
                setFormState(prev => ({
                  ...prev,
                  emailAcknowledgement: { ...prev.emailAcknowledgement, subjectPrefix: e.target.value }
                }))
              }
              placeholder="e.g. Booking Acknowledgement Received"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#23150d] border border-[#b45309]/40 text-white text-xs focus:outline-none focus:border-[#f59e0b]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#d6c2a8] mb-1.5">
              Devotional Greeting Opening
            </label>
            <input
              type="text"
              value={formState.emailAcknowledgement.welcomeGreeting}
              onChange={e =>
                setFormState(prev => ({
                  ...prev,
                  emailAcknowledgement: { ...prev.emailAcknowledgement, welcomeGreeting: e.target.value }
                }))
              }
              placeholder="e.g. Jai Sai Ram"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#23150d] border border-[#b45309]/40 text-white text-xs focus:outline-none focus:border-[#f59e0b]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#d6c2a8] mb-1.5">
            Closing Devotee Remarks in Email
          </label>
          <textarea
            rows={2}
            value={formState.emailAcknowledgement.customClosingRemarks}
            onChange={e =>
              setFormState(prev => ({
                ...prev,
                emailAcknowledgement: { ...prev.emailAcknowledgement, customClosingRemarks: e.target.value }
              }))
            }
            placeholder="e.g. Our front desk team will contact you shortly to confirm your room reservation..."
            className="w-full p-3 rounded-xl bg-[#23150d] border border-[#b45309]/40 text-white text-xs focus:outline-none focus:border-[#f59e0b]"
          />
        </div>
      </div>

      {/* Save Button at Bottom */}
      <div className="flex items-center justify-between pt-2">
        <p className="text-xs text-[#d6c2a8]/60">
          All modifications update in real-time on the guest-facing booking popup.
        </p>
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#b45309] hover:bg-[#d97706] text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
        >
          {saveSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Saved!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Online Booking Form</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
