import { defineStore } from 'pinia';
import { useUserStore } from "@/stores/userStores";
import { getMonth } from "@/composable/util";

interface GlobalState {
    monthIndex: number;
    smallCalendarMonth: number;
    daySelected: Date | null;
    showEventModal: boolean;
    savedEvents: any[];
    selectedEvent: any | null; 
    labels: any[];
    filteredEvents: any[];
    labelBarber: any[];
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
        labelBarber: []
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
        setLabelBarber(events: any[]) {
            this.labelBarber = events;
        },
    }
});
