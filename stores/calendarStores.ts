// store/index.ts
import { defineStore } from 'pinia';

interface GlobalState {
    monthIndex: number;
    smallCalendarMonth: number;
    daySelected: Date | null;
    showEventModal: boolean;
    savedEvents: any[]; // Altere o tipo conforme necessário
    selectedEvent: any | null; // Altere o tipo conforme necessário
    labels: any[]; // Altere o tipo conforme necessário
    filteredEvents: any[]; // Altere o tipo conforme necessário
}

export const useCalendarStore = defineStore('calendar', {
    state: (): GlobalState => ({
        monthIndex: 0,
        smallCalendarMonth: 0,
        daySelected: null,
        showEventModal: false,
        savedEvents: [],
        selectedEvent: null,
        labels: [],
        filteredEvents: [],
    }),

    actions: {
        setMonthIndex(index: number) {
            this.monthIndex = index;
        },
        setSmallCalendarMonth(index: number) {
            this.smallCalendarMonth = index;
        },
        setDaySelected(day: Date | null) {
            this.daySelected = day;
        },
        setShowEventModal(show: boolean) {
            this.showEventModal = show;
        },
        dispatchCalEvent({ type, payload }: { type: string; payload: any }) {
            // Implement dispatch logic if needed
        },
        setSelectedEvent(event: any | null) {
            this.selectedEvent = event;
        },
        setLabels(labels: any[]) {
            this.labels = labels;
        },
        updateLabel(updatedLabel: any) {
            this.labels = this.labels.map((lbl) => (lbl.label === updatedLabel.label ? updatedLabel : lbl))
        },
        setFilteredEvents(events: any[]) {
            this.filteredEvents = events;
        },
    },
});
