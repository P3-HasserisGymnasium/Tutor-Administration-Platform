package project.backend.model;

public enum YearGroupEnum {
    PRE_IB("PRE-IB"),
    IB_1("IB-1"),
    IB_2("IB-2");

    private final String displayName;

    YearGroupEnum(String diplayName){
        this.displayName = diplayName;
    }

    public String getDisplayName(){
        return displayName;
    }

    @Override
    public String toString(){
        return displayName;
    }
}
